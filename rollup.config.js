// rollup.config.js
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';

const main = {
  input: 'src/creep.ts', // Update the input file to 'src/creep.ts'
  output: [
    {
      file: 'public/U235.mjs',
      format: 'esm',
      sourcemap: false,
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
      file: 'public/Pu239.js',
      format: 'iife',
      sourcemap: false,
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
