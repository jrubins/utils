import {
  formatCommas,
  formatDecimals,
  sIfy,
  yesNoIfy,
} from '../'

describe('text utils', () => {
  describe('formatCommas', () => {
    test('formats the commas properly', () => {
      expect(formatCommas(0)).toEqual('0')
      expect(formatCommas(100)).toEqual('100')
      expect(formatCommas(1000)).toEqual('1,000')
      expect(formatCommas(1000000)).toEqual('1,000,000')
      expect(formatCommas(1000.50)).toEqual('1,001')
    })

    test('formats the commas with decimals properly', () => {
      expect(formatCommas(0, {
        numDecimals: 0,
      })).toEqual('0')
      expect(formatCommas(22.5, {
        numDecimals: 2,
      })).toEqual('22.50')
      expect(formatCommas(5000.74, {
        numDecimals: 1,
      })).toEqual('5,000.7')
      expect(formatCommas(500000.34, {
        numDecimals: 2,
      })).toEqual('500,000.34')
    })
  })

  describe('formatDecimals', () => {
    test('formats a value with the provided number of decimals', () => {
      // Cuts off decimals.
      expect(formatDecimals(55.433232323, {
        numDecimals: 2,
      })).toEqual('55.43')

      // Rounds properly.
      expect(formatDecimals(55.433232363, {
        numDecimals: 7,
      })).toEqual('55.4332324')

      // Deals with 0.
      expect(formatDecimals(55.433232363, {
        numDecimals: 0,
      })).toEqual('55')

      // Adds decimals to an integer.
      expect(formatDecimals(55, {
        numDecimals: 2,
      })).toEqual('55.00')
    })

    test('allows decimals to be optional', () => {
      // Does not add decimals to an integer if decimals are optional.
      expect(formatDecimals(55, {
        decimalsOptional: true,
        numDecimals: 2,
      })).toEqual('55')

      // Still adds decimals to a float even if decimals are optional.
      expect(formatDecimals(55.043, {
        decimalsOptional: true,
        numDecimals: 2,
      })).toEqual('55.04')
    })
  })

  describe('sIfy', () => {
    test('adds an "s" if needed', () => {
      expect(sIfy('day', 1)).toEqual('day')
      expect(sIfy('day', 5)).toEqual('days')
    })
  })

  describe('yesNoIfy', () => {
    test('formats a value as Yes', () => {
      expect(yesNoIfy(true)).toEqual('Yes')
      expect(yesNoIfy([])).toEqual('Yes')
      expect(yesNoIfy({})).toEqual('Yes')
      expect(yesNoIfy(1)).toEqual('Yes')
    })

    test('formats a value as No', () => {
      expect(yesNoIfy(false)).toEqual('No')
      expect(yesNoIfy(null)).toEqual('No')
      expect(yesNoIfy(undefined)).toEqual('No')
      expect(yesNoIfy(0)).toEqual('No')
      expect(yesNoIfy('')).toEqual('No')
    })
  })
})
