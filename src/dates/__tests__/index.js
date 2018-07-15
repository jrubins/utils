import moment from 'moment'

import {
  addBusinessDaysToDate,
  addToDate,
  formatDate,
  isValidDate,
} from '../'

describe('date utils', () => {
  describe('addBusinessDaysToDate', () => {
    test('adds the specified number of business days to a date', () => {
      // 02.16.2018 is a Friday. We expect to add two extra days since we'll have a weekend.
      expect(formatDate(addBusinessDaysToDate('02.16.2018', {
        dateFormat: 'MM.DD.YYYY',
        quantity: 1,
      }), 'MM.DD.YYYY')).toEqual('02.19.2018')

      // 02.05.2018 is a Monday.
      expect(formatDate(addBusinessDaysToDate('02.05.2018', {
        dateFormat: 'MM.DD.YYYY',
        quantity: 4,
      }), 'MM.DD.YYYY')).toEqual('02.09.2018')

      // 02.07.2018 is a Wednesday so we expect two extra days in order to ignore Saturday and Sunday.
      expect(formatDate(addBusinessDaysToDate('02.07.2018', {
        dateFormat: 'MM.DD.YYYY',
        quantity: 6,
      }), 'MM.DD.YYYY')).toEqual('02.15.2018')

      // 02.07.2018 is a Wednesday. Make sure we get six extra days since we have 2 Saturdays and 2 Sundays
      // that we want to ignore for a total of 20 days.
      expect(formatDate(addBusinessDaysToDate('02.07.2018', {
        dateFormat: 'MM.DD.YYYY',
        quantity: 14,
      }), 'MM.DD.YYYY')).toEqual('02.27.2018')

      // 02.10.2018 is a Saturday. We want to end on a Monday if we add 1 business day to it.
      expect(formatDate(addBusinessDaysToDate('02.10.2018', {
        dateFormat: 'MM.DD.YYYY',
        quantity: 1,
      }), 'MM.DD.YYYY')).toEqual('02.12.2018')

      // 02.10.2018 is a Saturday. We want to end on a Wednesday if we add 8 business days to it.
      expect(formatDate(addBusinessDaysToDate('02.10.2018', {
        dateFormat: 'MM.DD.YYYY',
        quantity: 8,
      }), 'MM.DD.YYYY')).toEqual('02.21.2018')

      // 02.11.2018 is a Sunday. We want to end on a Monday if we add 1 business day to it.
      expect(formatDate(addBusinessDaysToDate('02.11.2018', {
        dateFormat: 'MM.DD.YYYY',
        quantity: 1,
      }), 'MM.DD.YYYY')).toEqual('02.12.2018')

      // 02.11.2018 is a Sunday. We want to end on a Wednesday if we add 8 business days to it.
      expect(formatDate(addBusinessDaysToDate('02.11.2018', {
        dateFormat: 'MM.DD.YYYY',
        quantity: 8,
      }), 'MM.DD.YYYY')).toEqual('02.21.2018')
    })
  })

  describe('addToDate', () => {
    test('adds time to a non-ISO 8601 provided date', () => {
      expect(formatDate(addToDate('11.17.2017', {
        dateFormat: 'MM.DD.YYYY',
        quantity: 1,
        units: 'y',
      }), 'MM.DD.YYYY')).toEqual('11.17.2018')
    })

    test('adds time to a previous moment', () => {
      const date = moment('11.17.2017', 'MM.DD.YYYY')

      expect(formatDate(addToDate(date, {
        quantity: 1,
        units: 'y',
      }), 'MM.DD.YYYY')).toEqual('11.17.2018')
    })

    test('adds time to an ISO 8601 date', () => {
      expect(formatDate(addToDate('2017-11-17', {
        quantity: 1,
        units: 'y',
      }), 'MM.DD.YYYY')).toEqual('11.17.2018')
    })
  })

  describe('formatDate', () => {
    test('formats number dates properly', () => {
      expect(formatDate(1497449658)).toEqual('06/14/2017')
    })

    test('formats string dates properly', () => {
      expect(formatDate('2017-06-14T16:56:55.455Z')).toEqual('06/14/2017')
    })

    test('allows a specifier for the date format to use for parsing the date value', () => {
      expect(formatDate('14:35:32', 'h:mm:ss a', {
        parseFormat: 'hh:mm:ss',
      })).toEqual('2:35:32 pm')
    })
  })

  describe('isValidDate', () => {
    test('validates dates', () => {
      expect(isValidDate('1:75pm', ['h:mma'])).toEqual(false)
      expect(isValidDate('12:00pm', ['h:mma'])).toEqual(true)
      expect(isValidDate('12:00am', ['h:mma'])).toEqual(true)
      expect(isValidDate('4:35AM', ['h:mma'])).toEqual(true)

      expect(isValidDate('05/45/1991', ['MM/DD/YYYY'])).toEqual(false)
      expect(isValidDate('02/14/2018', ['MM/DD/YYYY'])).toEqual(true)
    })

    test('allows multiple date formats', () => {
      // Matches none.
      expect(isValidDate('1:75pm', ['h:mma', 'MM/DD/YYYY'])).toEqual(false)

      // Matches one.
      expect(isValidDate('12:00pm', ['MM/DD/YYYY', 'h:mma'])).toEqual(true)
    })
  })
})
