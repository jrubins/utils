import {
  formatCommas,
} from '../text'

/**
 * Formats the provided currency value into a string with the currency symbol.
 *
 * @param {Number} value
 * @param {Object} [opts]
 * @param {Number} [options.numDecimals]
 * @param {Boolean} [options.round]
 * @returns {String}
 */
export function formatCurrency(value, opts = {}) {
  const {
    numDecimals = 2,
    round = true,
  } = opts
  let transformedValue = value

  if (!round) {
    // We do this to get our value without rounding. toFixed rounds.
    const regex = new RegExp(`^-?\\d+(?:\\.\\d{0,${numDecimals}})?`)
    const regexMatch = value.toString().match(regex)

    if (regexMatch) {
      transformedValue = regexMatch[0]
    }
  }

  const currencyValue = formatCommas(transformedValue, {
    numDecimals,
  })

  return `$${currencyValue}`
}
