// rollup.config.js
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';

// Read and base64 encode the worker script
const workerScript = fs.readFileSync('public/creep.js', 'utf-8');
const workerScriptBase64 = Buffer.from(workerScript).toString('base64');

fs.writeFileSync("./public/creep.js.b64", workerScriptBase64);


const main = {
  input: 'src/creep.ts', // Update the input file to 'src/creep.ts'
  output: [
    {
      file: 'public/index.mjs',
      format: 'esm',
      sourcemap: true,
      exports: 'named'
    },
  ],
  plugins: [
    json(),
    typescript(), // Add the plugin to your configuration
  ],
  external: [],
};

const worker = {
  input: 'src/svcWorker.ts', // Update the input file to 'src/creep.ts'
  output: [
    {
      file: 'public/creep.js',
      format: 'iife',
      sourcemap: true,
      exports: 'named'
    },
  ],
  plugins: [
    json(),
    typescript(), // Add the plugin to your configuration,
  ],
  external: [],
};


export default [main, worker];
