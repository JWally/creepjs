/* eslint-disable linebreak-style */
import {removeDifferences} from './utils/removeDifferences.mjs';
import {probability} from './lies/probability.mjs';
import getOfflineAudioContext from './audio'
import getCanvas2d from './canvas'
import getCSS from './css'
import getCSSMedia from './cssmedia'
import getHTMLElementVersion from './document'
import getClientRects from './domrect'
import getConsoleErrors from './engine'
import { timer, getCapturedErrors, caniuse } from './errors'
import getEngineFeatures from './features'
import getFonts from './fonts'
import getHeadlessFeatures from './headless'
import getIntl from './intl'
import { getLies, PARENT_PHANTOM } from './lies'
import getMaths from './math'
import getMedia from './media'
import getNavigator from './navigator'
import getResistance from './resistance'
import getScreen from './screen'
import getVoices from './speech'
import getSVG from './svg'
import getTimezone from './timezone'
import { getTrash} from './trash'
import { hashify} from './utils/crypto'
import { exile, getStackBytes } from './utils/exile'
import { IS_BLINK, braveBrowser, getBraveMode, getBraveUnprotectedParameters, LowerEntropy, queueTask } from './utils/helpers'
import getCanvasWebgl from './webgl'
import getWindowFeatures from './window'
import getBestWorkerScope, { Scope, spawnWorker } from './worker'


const main = async function() {
	'use strict';

	const scope = await spawnWorker()
	if (scope == Scope.WORKER) {
		return
	}

	await queueTask()
	const stackBytes = getStackBytes()
	await exile()

	const isBrave = IS_BLINK ? await braveBrowser() : false
	const braveMode = isBrave ? getBraveMode() : {}
	const braveFingerprintingBlocking = isBrave && (braveMode.standard || braveMode.strict)

	const fingerprint = async () => {
		const timeStart = timer()
		const fingerprintTimeStart = timer()
		// @ts-ignore
		let [
			workerScopeComputed,
			voicesComputed,
			offlineAudioContextComputed,
			canvasWebglComputed,
			canvas2dComputed,
			windowFeaturesComputed,
			htmlElementVersionComputed,
			cssComputed,
			cssMediaComputed,
			screenComputed,
			mathsComputed,
			consoleErrorsComputed,
			timezoneComputed,
			clientRectsComputed,
			fontsComputed,
			mediaComputed,
			svgComputed,
			resistanceComputed,
			intlComputed,
		] = await Promise.all([
			getBestWorkerScope(),
			getVoices(),
			getOfflineAudioContext(),
			getCanvasWebgl(),
			getCanvas2d(),
			getWindowFeatures(),
			getHTMLElementVersion(),
			getCSS(),
			getCSSMedia(),
			getScreen(),
			getMaths(),
			getConsoleErrors(),
			getTimezone(),
			getClientRects(),
			getFonts(),
			getMedia(),
			getSVG(),
			getResistance(),
			getIntl(),
		]).catch((error) => console.error(error.message))



		let [
			voicesComputed2,
			offlineAudioContextComputed2,
			canvasWebglComputed2,
			canvas2dComputed2,
			windowFeaturesComputed2,
			htmlElementVersionComputed2,
			cssComputed2,
			cssMediaComputed2,
			screenComputed2,
			mathsComputed2,
			consoleErrorsComputed2,
			timezoneComputed2,
			clientRectsComputed2,
			fontsComputed2,
			mediaComputed2,
			svgComputed2,
			resistanceComputed2,
			intlComputed2,
		] = await Promise.all([

			getVoices(),
			getOfflineAudioContext(),
			getCanvasWebgl(),
			getCanvas2d(),
			getWindowFeatures(),
			getHTMLElementVersion(),
			getCSS(),
			getCSSMedia(),
			getScreen(),
			getMaths(),
			getConsoleErrors(),
			getTimezone(),
			getClientRects(),
			getFonts(),
			getMedia(),
			getSVG(),
			getResistance(),
			getIntl(),
		]).catch((error) => console.error(error.message))

		voicesComputed = removeDifferences(voicesComputed, voicesComputed2);
		offlineAudioContextComputed = removeDifferences(offlineAudioContextComputed, offlineAudioContextComputed2);
		canvasWebglComputed = removeDifferences(canvasWebglComputed, canvasWebglComputed2);
		canvas2dComputed = removeDifferences(canvas2dComputed, canvas2dComputed2);
		windowFeaturesComputed = removeDifferences(windowFeaturesComputed, windowFeaturesComputed2);
		htmlElementVersionComputed = removeDifferences(htmlElementVersionComputed, htmlElementVersionComputed2);
		cssComputed = removeDifferences(cssComputed, cssComputed2);
		cssMediaComputed = removeDifferences(cssMediaComputed, cssMediaComputed2);
		screenComputed = removeDifferences(screenComputed, screenComputed2);
		mathsComputed = removeDifferences(mathsComputed, mathsComputed2);
		consoleErrorsComputed = removeDifferences(consoleErrorsComputed, consoleErrorsComputed2);
		timezoneComputed = removeDifferences(timezoneComputed, timezoneComputed2);
		clientRectsComputed = removeDifferences(clientRectsComputed, clientRectsComputed2);
		fontsComputed = removeDifferences(fontsComputed, fontsComputed2);
		mediaComputed = removeDifferences(mediaComputed, mediaComputed2);
		svgComputed = removeDifferences(svgComputed, svgComputed2);
		resistanceComputed = removeDifferences(resistanceComputed, resistanceComputed2);
		intlComputed = removeDifferences(intlComputed, intlComputed2);

		const navigatorComputed = await getNavigator(workerScopeComputed)
			.catch((error) => console.error(error.message))

		// @ts-ignore
		const [
			headlessComputed,
			featuresComputed,
		] = await Promise.all([
			getHeadlessFeatures({
				webgl: canvasWebglComputed,
				workerScope: workerScopeComputed,
			}),
			getEngineFeatures({
				cssComputed,
				navigatorComputed,
				windowFeaturesComputed,
			}),
		]).catch((error) => console.error(error.message))

		// @ts-ignore
		const [
			liesComputed,
			trashComputed,
			capturedErrorsComputed,
		] = await Promise.all([
			getLies(),
			getTrash(),
			getCapturedErrors(),
		]).catch((error) => console.error(error.message))

		const fingerprintTimeEnd = fingerprintTimeStart()

		// GPU Prediction
		const { parameters: gpuParameter } = canvasWebglComputed || {}
		const reducedGPUParameters = {
			...(
				braveFingerprintingBlocking ? getBraveUnprotectedParameters(gpuParameter) :
					gpuParameter
			),
			RENDERER: undefined,
			SHADING_LANGUAGE_VERSION: undefined,
			UNMASKED_RENDERER_WEBGL: undefined,
			UNMASKED_VENDOR_WEBGL: undefined,
			VERSION: undefined,
			VENDOR: undefined,
		}

		// Hashing
		const hashStartTime = timer()
		// @ts-ignore
		const [
			windowHash,
			headlessHash,
			htmlHash,
			cssMediaHash,
			cssHash,
			styleHash,
			styleSystemHash,
			screenHash,
			voicesHash,
			canvas2dHash,
			canvas2dImageHash,
			canvas2dPaintHash,
			canvas2dTextHash,
			canvas2dEmojiHash,
			canvasWebglHash,
			canvasWebglImageHash,
			canvasWebglParametersHash,
			pixelsHash,
			pixels2Hash,
			mathsHash,
			consoleErrorsHash,
			timezoneHash,
			rectsHash,
			domRectHash,
			audioHash,
			fontsHash,
			workerHash,
			mediaHash,
			mimeTypesHash,
			navigatorHash,
			liesHash,
			trashHash,
			errorsHash,
			svgHash,
			resistanceHash,
			intlHash,
			featuresHash,
			deviceOfTimezoneHash,
		] = await Promise.all([
			hashify(windowFeaturesComputed),
			hashify(headlessComputed),
			hashify((htmlElementVersionComputed || {}).keys),
			hashify(cssMediaComputed),
			hashify(cssComputed),
			hashify((cssComputed || {}).computedStyle),
			hashify((cssComputed || {}).system),
			hashify(screenComputed),
			hashify(voicesComputed),
			hashify(canvas2dComputed),
			hashify((canvas2dComputed || {}).dataURI),
			hashify((canvas2dComputed || {}).paintURI),
			hashify((canvas2dComputed || {}).textURI),
			hashify((canvas2dComputed || {}).emojiURI),
			hashify(canvasWebglComputed),
			hashify((canvasWebglComputed || {}).dataURI),
			hashify(reducedGPUParameters),
			((canvasWebglComputed || {}).pixels || []).length ? hashify(canvasWebglComputed.pixels) : undefined,
			((canvasWebglComputed || {}).pixels2 || []).length ? hashify(canvasWebglComputed.pixels2) : undefined,
			hashify((mathsComputed || {}).data),
			hashify((consoleErrorsComputed || {}).errors),
			hashify(timezoneComputed),
			hashify(clientRectsComputed),
			hashify([
				(clientRectsComputed || {}).elementBoundingClientRect,
				(clientRectsComputed || {}).elementClientRects,
				(clientRectsComputed || {}).rangeBoundingClientRect,
				(clientRectsComputed || {}).rangeClientRects,
			]),
			hashify(offlineAudioContextComputed),
			hashify(fontsComputed),
			hashify(workerScopeComputed),
			hashify(mediaComputed),
			hashify((mediaComputed || {}).mimeTypes),
			hashify(navigatorComputed),
			hashify(liesComputed),
			hashify(trashComputed),
			hashify(capturedErrorsComputed),
			hashify(svgComputed),
			hashify(resistanceComputed),
			hashify(intlComputed),
			hashify(featuresComputed),
			hashify((() => {
				const {
					bluetoothAvailability,
					device,
					deviceMemory,
					hardwareConcurrency,
					maxTouchPoints,
					oscpu,
					platform,
					system,
					userAgentData,
				} = navigatorComputed || {}
				const {
					architecture,
					bitness,
					mobile,
					model,
					platform: uaPlatform,
					platformVersion,
				} = userAgentData || {}
				const { anyPointer } = cssMediaComputed || {}
				const { colorDepth, pixelDepth, height, width } = screenComputed || {}
				const { location, locationEpoch, zone } = timezoneComputed || {}
				const {
					deviceMemory: deviceMemoryWorker,
					hardwareConcurrency: hardwareConcurrencyWorker,
					gpu,
					platform: platformWorker,
					system: systemWorker,
					timezoneLocation: locationWorker,
					userAgentData: userAgentDataWorker,
				} = workerScopeComputed || {}
				const { compressedGPU, confidence } = gpu || {}
				const {
					architecture: architectureWorker,
					bitness: bitnessWorker,
					mobile: mobileWorker,
					model: modelWorker,
					platform: uaPlatformWorker,
					platformVersion: platformVersionWorker,
				} = userAgentDataWorker || {}

				return [
					anyPointer,
					architecture,
					architectureWorker,
					bitness,
					bitnessWorker,
					bluetoothAvailability,
					colorDepth,
					...(compressedGPU && confidence != 'low' ? [compressedGPU] : []),
					device,
					deviceMemory,
					deviceMemoryWorker,
					hardwareConcurrency,
					hardwareConcurrencyWorker,
					height,
					location,
					locationWorker,
					locationEpoch,
					maxTouchPoints,
					mobile,
					mobileWorker,
					model,
					modelWorker,
					oscpu,
					pixelDepth,
					platform,
					platformWorker,
					platformVersion,
					platformVersionWorker,
					system,
					systemWorker,
					uaPlatform,
					uaPlatformWorker,
					width,
					zone,
				]
			})()),
		]).catch((error) => console.error(error.message))

		const hashTimeEnd = hashStartTime()
		const timeEnd = timeStart()

	
		if (PARENT_PHANTOM) {
			// @ts-ignore
			PARENT_PHANTOM.parentNode.removeChild(PARENT_PHANTOM)
		}

		const fingerprint = {
			workerScope: !workerScopeComputed ? undefined : { ...workerScopeComputed, $hash: workerHash},
			navigator: !navigatorComputed ? undefined : {...navigatorComputed, $hash: navigatorHash},
			windowFeatures: !windowFeaturesComputed ? undefined : {...windowFeaturesComputed, $hash: windowHash},
			headless: !headlessComputed ? undefined : {...headlessComputed, $hash: headlessHash},
			htmlElementVersion: !htmlElementVersionComputed ? undefined : {...htmlElementVersionComputed, $hash: htmlHash},
			cssMedia: !cssMediaComputed ? undefined : {...cssMediaComputed, $hash: cssMediaHash},
			css: !cssComputed ? undefined : {...cssComputed, $hash: cssHash},
			screen: !screenComputed ? undefined : {...screenComputed, $hash: screenHash},
			voices: !voicesComputed ? undefined : {...voicesComputed, $hash: voicesHash},
			media: !mediaComputed ? undefined : {...mediaComputed, $hash: mediaHash},
			canvas2d: !canvas2dComputed ? undefined : {...canvas2dComputed, $hash: canvas2dHash},
			canvasWebgl: !canvasWebglComputed ? undefined : {...canvasWebglComputed, pixels: pixelsHash, pixels2: pixels2Hash, $hash: canvasWebglHash},
			maths: !mathsComputed ? undefined : {...mathsComputed, $hash: mathsHash},
			consoleErrors: !consoleErrorsComputed ? undefined : {...consoleErrorsComputed, $hash: consoleErrorsHash},
			timezone: !timezoneComputed ? undefined : {...timezoneComputed, $hash: timezoneHash},
			clientRects: !clientRectsComputed ? undefined : {...clientRectsComputed, $hash: rectsHash},
			offlineAudioContext: !offlineAudioContextComputed ? undefined : {...offlineAudioContextComputed, $hash: audioHash},
			fonts: !fontsComputed ? undefined : {...fontsComputed, $hash: fontsHash},
			lies: !liesComputed ? undefined : {...liesComputed, $hash: liesHash},
			trash: !trashComputed ? undefined : {...trashComputed, $hash: trashHash},
			capturedErrors: !capturedErrorsComputed ? undefined : {...capturedErrorsComputed, $hash: errorsHash},
			svg: !svgComputed ? undefined : {...svgComputed, $hash: svgHash },
			resistance: !resistanceComputed ? undefined : {...resistanceComputed, $hash: resistanceHash},
			intl: !intlComputed ? undefined : {...intlComputed, $hash: intlHash},
			features: !featuresComputed ? undefined : {...featuresComputed, $hash: featuresHash},
		}
		return {
			fingerprint,
			styleSystemHash,
			styleHash,
			domRectHash,
			mimeTypesHash,
			canvas2dImageHash,
			canvasWebglImageHash,
			canvas2dPaintHash,
			canvas2dTextHash,
			canvas2dEmojiHash,
			canvasWebglParametersHash,
			deviceOfTimezoneHash,
			timeEnd,
		}
	}

	// fingerprint and render
	const {
		fingerprint: fp,
		styleSystemHash,
		styleHash,
		domRectHash,
		mimeTypesHash,
		canvas2dImageHash,
		canvas2dPaintHash,
		canvas2dTextHash,
		canvas2dEmojiHash,
		canvasWebglImageHash,
		canvasWebglParametersHash,
		deviceOfTimezoneHash,
		timeEnd,
	} = await fingerprint().catch((error) => console.error(error)) || {}

	if (!fp) {
		throw new Error('Fingerprint failed!')
	}

	const tmSum = +(fp.canvas2d?.textMetricsSystemSum) || 0

	// Trusted Fingerprint
	const trashLen = fp.trash.trashBin.length
	const liesLen = !('totalLies' in fp.lies) ? 0 : fp.lies.totalLies
	const errorsLen = fp.capturedErrors.data.length

	const hardenEntropy = (workerScope, prop) => {
		return (
			!workerScope ? prop :
				(workerScope.localeEntropyIsTrusty && workerScope.localeIntlEntropyIsTrusty) ? prop :
					undefined
		)
	}

	const privacyResistFingerprinting = (
		fp.resistance && /^(tor browser|firefox)$/i.test(fp.resistance.privacy)
	)

	// harden gpu
	const hardenGPU = (canvasWebgl) => {
		const { gpu: { confidence, compressedGPU } } = canvasWebgl
		return (
			confidence == 'low' ? {} : {
				UNMASKED_RENDERER_WEBGL: compressedGPU,
				UNMASKED_VENDOR_WEBGL: canvasWebgl.parameters.UNMASKED_VENDOR_WEBGL,
			}
		)
	}


	// Clean up the lies in the WorkerNavigator Section
	// in the dirtiest way possible...
	//
	const workerProtoLies = Object.keys(fp.workerScope.lies.proto);

	//
	// if protoLies.length === "lied"
	// set lied to false
	//
	if(workerProtoLies.length === fp.workerScope.lied){
		fp.workerScope.lied = false;
	}

	//
	// Remove the lies from the totals
	//
	for(let i = 0; i < workerProtoLies.length; i++){
		const lieKey = workerProtoLies[i];
		const lieLength = fp.workerScope.lies.proto[lieKey].length;
		delete fp.workerScope.lies.proto[lieKey];
		delete fp.lies.data[lieKey];
		fp.lies.totalLies -= lieLength;
	}

	const creep = {
		navigator: (
			!fp.navigator || fp.navigator.lied ? undefined : {
				bluetoothAvailability: fp.navigator.bluetoothAvailability,
				device: fp.navigator.device,
				deviceMemory: fp.navigator.deviceMemory,
				hardwareConcurrency: fp.navigator.hardwareConcurrency,
				maxTouchPoints: fp.navigator.maxTouchPoints,
				oscpu: fp.navigator.oscpu,
				platform: fp.navigator.platform,
				system: fp.navigator.system,
				userAgentData: {
					...(fp.navigator.userAgentData || {}),
					// loose
					brandsVersion: undefined,
					uaFullVersion: undefined,
				},
				vendor: fp.navigator.vendor,
			}
		),
		screen: (
			!fp.screen || fp.screen.lied || privacyResistFingerprinting || LowerEntropy.SCREEN ? undefined :
				hardenEntropy(
					fp.workerScope, {
						height: fp.screen.height,
						width: fp.screen.width,
						pixelDepth: fp.screen.pixelDepth,
						colorDepth: fp.screen.colorDepth,
						lied: fp.screen.lied,
					},
				)
		),
		workerScope: !fp.workerScope || fp.workerScope.lied ? undefined : {
			deviceMemory: (
				braveFingerprintingBlocking ? undefined : fp.workerScope.deviceMemory
			),
			hardwareConcurrency: (
				braveFingerprintingBlocking ? undefined : fp.workerScope.hardwareConcurrency
			),
			// system locale in blink
			language: !LowerEntropy.TIME_ZONE ? fp.workerScope.language : undefined,
			platform: fp.workerScope.platform,
			system: fp.workerScope.system,
			device: fp.workerScope.device,
			timezoneLocation: (
				!LowerEntropy.TIME_ZONE ?
					hardenEntropy(fp.workerScope, fp.workerScope.timezoneLocation) :
						undefined
			),
			webglRenderer: (
				(fp.workerScope.gpu.confidence != 'low') ? fp.workerScope.gpu.compressedGPU : undefined
			),
			webglVendor: (
				(fp.workerScope.gpu.confidence != 'low') ? fp.workerScope.webglVendor : undefined
			),
			userAgentData: {
				...fp.workerScope.userAgentData,
				// loose
				brandsVersion: undefined,
				uaFullVersion: undefined,
			},
		},
		media: fp.media,
		canvas2d: ((canvas2d) => {
			if (!canvas2d) {
				return
			}
			const { lied, liedTextMetrics } = canvas2d
			let data
			if (!lied) {
				const { dataURI, paintURI, textURI, emojiURI } = canvas2d
				data = {
					lied,
					...{ dataURI, paintURI, textURI, emojiURI },
				}
			}
			if (!liedTextMetrics) {
				const { textMetricsSystemSum, emojiSet } = canvas2d
				data = {
					...(data || {}),
					...{ textMetricsSystemSum, emojiSet },
				}
			}
			return data
		})(fp.canvas2d),
		canvasWebgl: (!fp.canvasWebgl || fp.canvasWebgl.lied || LowerEntropy.WEBGL) ? undefined : (
			braveFingerprintingBlocking ? {
				parameters: {
					...getBraveUnprotectedParameters(fp.canvasWebgl.parameters),
					...hardenGPU(fp.canvasWebgl),
				},
			} : {
				...((gl, canvas2d) => {
					if ((canvas2d && canvas2d.lied) || LowerEntropy.CANVAS) {
						// distrust images
						const { extensions, gpu, lied, parameterOrExtensionLie } = gl
						return {
							extensions,
							gpu,
							lied,
							parameterOrExtensionLie,
						}
					}
					return gl
				})(fp.canvasWebgl, fp.canvas2d),
				parameters: {
					...fp.canvasWebgl.parameters,
					...hardenGPU(fp.canvasWebgl),
				},
			}
		),
		cssMedia: !fp.cssMedia ? undefined : {
			reducedMotion: caniuse(() => fp.cssMedia.mediaCSS['prefers-reduced-motion']),
			colorScheme: (
				braveFingerprintingBlocking ? undefined :
				caniuse(() => fp.cssMedia.mediaCSS['prefers-color-scheme'])
			),
			monochrome: caniuse(() => fp.cssMedia.mediaCSS.monochrome),
			invertedColors: caniuse(() => fp.cssMedia.mediaCSS['inverted-colors']),
			forcedColors: caniuse(() => fp.cssMedia.mediaCSS['forced-colors']),
			anyHover: caniuse(() => fp.cssMedia.mediaCSS['any-hover']),
			hover: caniuse(() => fp.cssMedia.mediaCSS.hover),
			anyPointer: caniuse(() => fp.cssMedia.mediaCSS['any-pointer']),
			pointer: caniuse(() => fp.cssMedia.mediaCSS.pointer),
			colorGamut: caniuse(() => fp.cssMedia.mediaCSS['color-gamut']),
			screenQuery: (
				privacyResistFingerprinting || (LowerEntropy.SCREEN || LowerEntropy.IFRAME_SCREEN) ?
					undefined :
						hardenEntropy(fp.workerScope, caniuse(() => fp.cssMedia.screenQuery))
			),
		},
		css: !fp.css ? undefined : fp.css.system.fonts,
		timezone: !fp.timezone || fp.timezone.lied || LowerEntropy.TIME_ZONE ? undefined : {
			locationMeasured: hardenEntropy(fp.workerScope, fp.timezone.locationMeasured),
			lied: fp.timezone.lied,
		},
		offlineAudioContext: !fp.offlineAudioContext ? undefined : (
			fp.offlineAudioContext.lied || LowerEntropy.AUDIO ? undefined :
				fp.offlineAudioContext
		),
		fonts: !fp.fonts || fp.fonts.lied || LowerEntropy.FONTS ? undefined : fp.fonts.fontFaceLoadFonts,
		forceRenew: 1672005503901,
	}

	//
	// This makes the FP too volatile...
	//
	delete creep?.cssMedia?.screenQuery;
    delete creep?.screen;

	//
	// If the asshole hitting us used a Proxy wrapper
	// on navigator and should get lit the fuck up.
	//
	let proxyNavigatorUsed;
	try{
		proxyNavigatorUsed = Reflect.setPrototypeOf(navigator, Object.create(navigator));
	} catch(e){
		proxyNavigatorUsed = true;
	}


	if(proxyNavigatorUsed){
		fp.headless.headless.webDriverIsOn = true;
		fp.lies.data["Navigator.Proxy.Used"] = [true];
		fp.lies.totalLies += 50;
		fp.headless.stealthRating = 100;
	} 

	if(fp.headless.headless.webDriverIsOn){
		fp.headless.headlessRating = 100;
		fp.headless.likeHeadlessRating = 100;
	}


	const [fpHash, creepHash] = await Promise.all([hashify(fp), hashify(creep)])
	.catch((error) => {
		console.error(error.message)
	}) || []

	let lieProbability;
	
	// Try Lie Probability
	try{
		lieProbability = await probability(fp, creep);
	} catch(err){
		lieProbability = undefined;
	}

	return {
		fpHash, 
		creepHash, 
		fp, 
		creep, 
		lieProbability
	};

}

export { main };