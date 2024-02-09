import { isFontOSBad } from '../fonts'
import { WORKER_TYPE } from '../worker'
import { getReportedPlatform } from './helpers'

// https://stackoverflow.com/a/22429679
const hashMini = (x) => {
	const json = `${JSON.stringify(x)}`
	const hash = json.split('').reduce((hash, char, i) => {
		return Math.imul(31, hash) + json.charCodeAt(i) | 0
	}, 0x811c9dc5)
	return ('0000000' + (hash >>> 0).toString(16)).substr(-8)
}

// instance id
const instanceId = (
	String.fromCharCode(Math.random() * 26 + 97) +
	Math.random().toString(36).slice(-7)
)

// https://stackoverflow.com/a/53490958
// https://stackoverflow.com/a/43383990
// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
const hashify = (x, algorithm = 'SHA-256') => {
	const json = `${JSON.stringify(x)}`
	const jsonBuffer = new TextEncoder().encode(json)
	return crypto.subtle.digest(algorithm, jsonBuffer).then((hashBuffer) => {
		const hashArray = Array.from(new Uint8Array(hashBuffer))
		const hashHex = hashArray.map((b) => ('00' + b.toString(16)).slice(-2)).join('')
		return hashHex
	})
}

async function cipher(data: any): Promise<string[]> {
	const iv = crypto.getRandomValues(new Uint8Array(12))
	const key = await crypto.subtle.generateKey(
		{ name: 'AES-GCM', length: 256 },
		true,
		['encrypt', 'decrypt'],
	)
	const json = JSON.stringify(data)
	const encoded = new TextEncoder().encode(json)
	const ciphertext = await crypto.subtle.encrypt(
		{ name: 'AES-GCM', iv },
		key,
		encoded,
	)
	const message = btoa(String.fromCharCode.apply(
		null,
		new Uint8Array(ciphertext) as unknown as number[],
	))
	const vector = btoa(String.fromCharCode.apply(
		null,
		iv as unknown as number[],
	))
	const { k: keyData } = await crypto.subtle.exportKey('jwk', key)

	return [message, vector, keyData!]
}


const getBotHash = (fp, imports) => {
	const { getFeaturesLie, computeWindowsRelease } = imports
	const outsideFeaturesVersion = getFeaturesLie(fp)
	const workerScopeIsBlocked = (
		!fp.workerScope ||
		!fp.workerScope.userAgent ||
		// only accept shared and service types
		// device emulators can easily spoof dedicated scope
		WORKER_TYPE == 'dedicated'
	)
	const liedWorkerScope = !!(fp.workerScope && fp.workerScope.lied)
	let liedPlatformVersion = false
	if (fp.workerScope && fp.fonts) {
		const { platformVersion, platform } = fp.workerScope.userAgentData || {}
		const { platformVersion: fontPlatformVersion } = fp.fonts || {}
		const windowsRelease = computeWindowsRelease({
			platform,
			platformVersion,
			fontPlatformVersion,
		})

		const windowsPlatformVersionLie = (
			windowsRelease &&
			fontPlatformVersion &&
			!(''+windowsRelease).includes(fontPlatformVersion)
		)
		// use font platform (window scope) to detect userAgent (worker scope) lies
		const macOrWindowsPlatformVersionLie = (
			/macOS|Windows/.test(fontPlatformVersion) &&
			(platform && !fontPlatformVersion.includes(platform))
		)
		liedPlatformVersion = (
			windowsPlatformVersionLie ||
			macOrWindowsPlatformVersionLie
		)
	}

	const { totalLies } = fp.lies || {}
	const { fontFaceLoadFonts } = fp.fonts || {}
	const { userAgent } = fp.workerScope || {}
	const { stealth } = fp.headless || {}
	const [workerUserAgentOS] = userAgent ? getReportedPlatform(userAgent) : []
	const maxLieCount = 100
	const extremeLieCount = (
		isFontOSBad(workerUserAgentOS, fontFaceLoadFonts) ||
		((totalLies || 0) > maxLieCount) ||
		Object.values(stealth || {}).some((x) => x === true) // stealth lies are severe
	)
	const functionToStringHasProxy = (
		!!( stealth || {})['Function.prototype.toString has invalid TypeError'] ||
		!!( stealth || {})['Function.prototype.toString leaks Proxy behavior']
	)

	// Pattern conditions that warrant rejection
	const botPatterns = {
		// custom order is important
		liedWorkerScope, // lws
		liedPlatformVersion, // lpv
		functionToStringHasProxy, // ftp
		outsideFeaturesVersion, // ofv
		extremeLieCount, // elc
		excessiveLooseFingerprints: false, // elf (compute on server)
		workerScopeIsBlocked, // wsb
		crowdBlendingScoreIsLow: false, // csl
	}

	const botHash = Object.keys(botPatterns)
		.map((key) => botPatterns[key] ? '1' : '0').join('')
	return { botHash, badBot: Object.keys(botPatterns).find((key) => botPatterns[key]) }
}

async function sha1Hash(str) {
    // Step 1: Encode the String
    const encoder = new TextEncoder();
    const data = encoder.encode(str);

    // Step 2: Hash the Data
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    
    // Convert the ArrayBuffer to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

const getFuzzyHash = async (fp) => {

	const metricKeys = [
		"canvasWebgl.parameters.MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS",
		"canvasWebgl.parameters.MAX_COLOR_ATTACHMENTS",
		"canvasWebgl.parameters.MAX_DRAW_BUFFERS_WEBGL",
		"canvasWebgl.parameters.MAX_DRAW_BUFFERS",
		"canvasWebgl.parameters.MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS",
		"canvasWebgl.parameters.MAX_SAMPLES",
		"canvasWebgl.parameters.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS",
		"canvasWebgl.parameters.MAX_UNIFORM_BLOCK_SIZE",
		"canvasWebgl.parameters.MAX_VARYING_COMPONENTS",
		//"canvasWebgl.parameters.MAX_VERTEX_OUTPUT_COMPONENTS",
		//"canvasWebgl.parameters.MAX_VERTEX_UNIFORM_COMPONENTS",
		"cssMedia.invertedColors",
		"cssMedia.hover",
		"cssMedia.forcedColors",
		"cssMedia.colorScheme",
		"cssMedia.colorGamut",
		"cssMedia.anyPointer",
		"cssMedia.anyHover",
		"navigator.device",
		"navigator.system",
		"navigator.platform",
	];


	function extractPropertiesToString(paths, obj) {
		return paths.reduce((acc, path) => {
			const keys = path.split('.');
			let value = keys.reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
			
			if (value === null) {
				value = ""; // Default message for non-existent properties
			}
	  
			return `${acc}${String(value)} `; // Concatenate the values with a space separator
		}, '').trim(); // Remove trailing space
	  }

	  let returnData = extractPropertiesToString(metricKeys, fp);

	  let hashData = await sha1Hash(returnData);

	  return hashData;
}

export { hashMini, instanceId, hashify, getBotHash, getFuzzyHash, cipher }
