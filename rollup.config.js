import {version} from './package.json'
import resolve from 'rollup-plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
// https://www.npmjs.com/package/rollup-plugin-terser
import {terser} from "rollup-plugin-terser"
import json from '@rollup/plugin-json'

const libName = 'ProcessModel'
export default {
  input: 'src/index.js',
  // sourcemap: false,
  output: [
    {
      name: libName,
      banner: `/*! ${libName} version ${version} */`,
      file: 'dist/processModel.js',
      format: 'umd'
    },
    {
      name: libName,
      banner: `/*! ${libName} version ${version} */`,
      file: 'dist/processModel.browser.js',
      format: 'iife'
    },
    {
      name: libName,
      banner: `/*! ${libName} version ${version} */`,
      file: 'dist/process-model.common.js',
      format: 'cjs'
    },
    {
      name: libName,
      banner: `/*! ${libName} version ${version} */`,
      file: 'dist/process-model.esm.mjs',
      format: 'esm'
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
      preferBuiltins: true
    }),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      exclude: '**/node_modules/**'
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
  //   'CryptoJS': true
  // },
  external: []
}
