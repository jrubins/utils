import _ from 'lodash'
import numeral from 'numeral'

/**
 * Returns a format to use if decimals should be added.
 *
 * @param {Number} [numDecimals]
 * @returns {String}
 */
function getDecimalsFormat(numDecimals = null) {
  return numDecimals ? `.${_.padEnd('', numDecimals, '0')}` : ''
}

/**
 * Formats the provided value with commas inserted in the appropriate places.
 *
 * @param {Number} value
 * @param {Object} [opts]
 * @param {Number} [opts.numDecimals]
 * @returns {String}
 */
export function formatCommas(value, opts = {}) {
  const {
    numDecimals = 0,
  } = opts
  const decimalString = getDecimalsFormat(numDecimals)

  return numeral(value).format(`0,0${decimalString}`)
}

/**
 * Formats the provided value with the requested number of decimals.
 *
 * @param {Number} value
 * @param {Object} opts
 * @param {Boolean} [opts.decimalsOptional]
 * @param {Number} opts.numDecimals
 * @returns {String}
 */
export function formatDecimals(value, opts = {}) {
  const {
    decimalsOptional = false,
    numDecimals,
  } = opts

  if (Number.isInteger(value) && decimalsOptional) {
    // Force to a string since that's what our contract says we return.
    return `${value}`
  }

  const decimalString = getDecimalsFormat(numDecimals)

  return numeral(value).format(`0${decimalString}`)
}

/**
 * Returns the provided term with an added "s" if the number before dictates it should.
 *
 * @param {String} value
 * @param {Number} numberBefore
 * @returns {String}
 */
export function sIfy(value, numberBefore) {
  return numberBefore === 1 ? value : `${value}s`
}

/**
 * Returns "Yes" if the provided value is truthy and "No" otherwise.
 *
 * @param {*} value
 * @returns {String}
 */
export function yesNoIfy(value) {
  return value ? 'Yes' : 'No'
}
