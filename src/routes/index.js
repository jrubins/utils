import {
  stringToObject,
} from '../general'

/**
 * Returns the parsed ID from the route match params.
 *
 * @param {Object} match
 * @param {Object} match.params
 * @param {String} match.params.id
 * @returns {Number}
 */
export function getParsedId(match) {
  return Number.parseInt(match.params.id, 10)
}

/**
 * "Un-stringifies" the query part of a provided string.
 *
 * @param {String} search
 * @returns {Object}
 */
export function unStringifyQuery(search) {
  if (!search) {
    return {}
  }

  // Get rid of the "?" at the beginning.
  return stringToObject({
    propDelimiter: '&',
    value: search.substring(1),
    valueDelimiter: '=',
    valueProcessorFn: value => decodeURIComponent(value),
  })
}
