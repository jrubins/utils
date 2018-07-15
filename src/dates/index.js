import _ from 'lodash'
import moment from 'moment'

/**
 * The default date format.
 *
 * @type {String}
 */
export const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY'

/**
 * Adds business days to the given date.
 *
 * @param {String|Number|Moment} date
 * @param {Object} opts
 * @param {String} opts.dateFormat
 * @param {Number} opts.quantity
 * @returns {Moment}
 */
export function addBusinessDaysToDate(date, { dateFormat = null, quantity }) {
  const momentObj = moment(date, dateFormat)
  // ISO weekdays are Monday=1 to Sunday=7.
  const isoWeekday = momentObj.isoWeekday()
  // Subtract 1 from the isoWeekday to get to a starting day of 0. Then add the quantity. If that's over some multiple
  // of 5, then we have to have some weekend days in our count.
  let weekendsInRange = Math.floor((isoWeekday - 1 + quantity) / 5)
  let extraDays = 0

  // We may need extra days instead of weekends if our start date is a weekend day.
  if (isoWeekday === 6) {
    extraDays = 1
    weekendsInRange = weekendsInRange - 1
  } else if (isoWeekday === 7) {
    weekendsInRange = weekendsInRange - 1
  }

  return addToDate(momentObj, {
    quantity: quantity + (weekendsInRange * 2) + extraDays,
    units: 'd',
  })
    .utc()
    .endOf('day')
}

/**
 * Adds time to the given date. For example, passing 1 for quantity and 'y' for units would add one year
 * to the provided date.
 *
 * Optionally provide the format of the date if the date is not in an ISO 8601 format.
 *
 * @param {String|Number|Moment} date
 * @param {Object} opts
 * @param {String} [opts.dateFormat]
 * @param {Number} opts.quantity
 * @param {String} opts.units
 * @returns {Moment}
 */
export function addToDate(date, { dateFormat = null, quantity, units }) {
  return moment(date, dateFormat).add(quantity, units)
}

/**
 * Formats the provided time into a date string (default MM/DD/YYYY).
 * If a timestamp is provided, it should be seconds since the Epoch.
 *
 * @param {String|Number} timestamp
 * @param {String} [dateFormat]
 * @param {Object} [opts]
 * @param {String} [opts.parseFormat] The format to use to parse the provided timestamp.
 * @returns {String}
 */
export function formatDate(timestamp, dateFormat = DEFAULT_DATE_FORMAT, { parseFormat = null } = {}) {
  const momentToFormat = moment(_.isNumber(timestamp) ? timestamp * 1000 : timestamp, parseFormat)

  return momentToFormat.format(dateFormat)
}

/**
 * Returns the number of seconds from the Epoch for the given date.
 *
 * @param {Date|String|Number} date
 * @returns {Number}
 */
export function getTimestamp(date) {
  return moment(date).unix()
}

/**
 * Returns if the provided date is valid according to the supplied formats. If it matches
 * any one of the supplied formats, it is considered valid.
 *
 * @param {Date|String|Number} date
 * @param {Array} parseFormats
 * @returns {Boolean}
 */
export function isValidDate(date, parseFormats) {
  for (let i = 0; i < parseFormats.length; i++) {
    if (moment(date, parseFormats[i], true).isValid()) {
      return true
    }
  }

  return false
}
