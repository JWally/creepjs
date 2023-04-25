// rollup.config.js
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

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
    typescript(), // Add the plugin to your configuration
  ],
  external: [],
};


export default [main, worker];
