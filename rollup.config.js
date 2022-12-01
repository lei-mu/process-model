// import {version} from './package.json'
import resolve from '@rollup/plugin-node-resolve';
import {babel} from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs'
// https://www.npmjs.com/package/rollup-plugin-terser
import {terser} from "rollup-plugin-terser"
import json from '@rollup/plugin-json'

import fs from 'fs'

const packageJsonData = JSON.parse(fs.readFileSync('package.json', 'utf8'))

const libName = 'ProcessModel'
const version = packageJsonData.version
export default {
  makeAbsoluteExternalsRelative: true,
  preserveEntrySignatures: 'strict',
  input: 'src/index.js',
  // sourcemap: false,
  output: [
    {
      name: libName,
      banner: `/*! ${libName} version ${version} */`,
      file: 'dist/process-model.umd.js',
      format: 'umd',
      esModule: true,
      generatedCode: {
        reservedNamesAsProps: false
      },
      interop: 'compat',
      systemNullSetters: false
    },
    {
      name: libName,
      banner: `/*! ${libName} version ${version} */`,
      file: 'dist/process-model.browser.js',
      format: 'iife',
      esModule: true,
      generatedCode: {
        reservedNamesAsProps: false
      },
      interop: 'compat',
      systemNullSetters: false
    },
    {
      name: libName,
      banner: `/*! ${libName} version ${version} */`,
      file: 'dist/process-model.common.js',
      format: 'cjs',
      esModule: true,
      generatedCode: {
        reservedNamesAsProps: false
      },
      interop: 'compat',
      systemNullSetters: false
    },
    {
      name: libName,
      banner: `/*! ${libName} version ${version} */`,
      file: 'dist/process-model.esm.mjs',
      format: 'esm',
      esModule: true,
      generatedCode: {
        reservedNamesAsProps: false
      },
      interop: 'compat',
      systemNullSetters: false
    }
  ],
  // customConfig (config) {
  //   if (!['umd', 'iife'].includes(config.output.format)){
  //     config.external.push('crypto-js')
  //   }
  // },
  plugins: [
    json(),
    resolve({
      moduleDirectories: ['node_modules']
      // preferBuiltins: true
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled'
      // babelHelpers: 'runtime',
      // exclude: '**/node_modules/**'
      // allowAllFormats: true,
      // presets: ['@babel/preset-env'],
      // plugins: [['@babel/plugin-transform-runtime', {useESModules: false}]]
    }),

    terser({
      ecma: undefined,
      warnings: false,
      parse: {},
      // https://github.com/terser/terser#compress-options
      compress: {
        // drop_console: true,
        pure_funcs: [
          'console.log',
          'console.info',
          'console.debug',
          'console.time',
          'console.timeEnd',
          'console.error'
        ]
      },
      format: {
        comments: /^!/
      }
    })

  ],
  // globals: {
  // },
  external: []
}
