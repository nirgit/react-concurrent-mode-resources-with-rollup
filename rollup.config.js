/** rollup.config.js */

import resolve from 'rollup-plugin-node-resolve'
import commonJS from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

import { uglify } from 'rollup-plugin-uglify'
import { terser } from 'rollup-plugin-terser'

function createBanner() {
  return `/**
 * The header to your file :)
 */
`
}

function getOutputFileName() {
  var DEFAULT_BUNDLE_NAME = 'bundle.js'
  return process.env.BUNDLE_FILENAME || DEFAULT_BUNDLE_NAME
}

function shouldUseMinifier() {
  var shouldMinify = process.env.MINIFY === 'true' // change this if you want compression
  if (shouldMinify) {
    console.info("---- Minifying ----")
  } else {
    console.info("---- NO Minification ----")
  }
  return !!shouldMinify
}

function getMinifier() {
  if (shouldUseMinifier()) {
    return uglify
  // return terser
  }
  return function(){}
}

export default {
  input: 'main.js',
  output: {
    banner: createBanner(),
    file: 'dist/' + getOutputFileName(),
    format: 'iife',
    name: 'wlr'
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    resolve(),
    commonJS(),
    // use terser() or uglify()
    (getMinifier())()
  ]
}
