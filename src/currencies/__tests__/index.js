import {
  formatCurrency,
} from '../'

describe('currencies utils', () => {
  describe('formatCurrency', () => {
    test('formats a provided value into a currency value without decimals', () => {
      expect(formatCurrency(0, {
        numDecimals: 0,
      })).toEqual('$0')
      expect(formatCurrency(2.4, {
        numDecimals: 0,
      })).toEqual('$2')
      expect(formatCurrency(2.5, {
        numDecimals: 0,
      })).toEqual('$3')
      expect(formatCurrency(1000, {
        numDecimals: 0,
      })).toEqual('$1,000')
      expect(formatCurrency(1000000, {
        numDecimals: 0,
      })).toEqual('$1,000,000')
    })

    test('formats a provided value with decimals', () => {
      expect(formatCurrency(34.3, {
        numDecimals: 1,
      })).toEqual('$34.3')
      expect(formatCurrency(34.58, {
        numDecimals: 1,
      })).toEqual('$34.6')
      expect(formatCurrency(0, {
        numDecimals: 2,
      })).toEqual('$0.00')
      expect(formatCurrency(0.54, {
        numDecimals: 2,
      })).toEqual('$0.54')
      expect(formatCurrency(34.5, {
        numDecimals: 2,
      })).toEqual('$34.50')
      expect(formatCurrency(34.98, {
        numDecimals: 2,
      })).toEqual('$34.98')
      expect(formatCurrency(1000, {
        numDecimals: 2,
      })).toEqual('$1,000.00')
    })

    test('formats a non-rounded value', () => {
      expect(formatCurrency(12.49, {
        numDecimals: 2,
        round: false,
      })).toEqual('$12.49')
    })
  })
})
