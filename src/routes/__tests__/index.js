import {
  getParsedId,
  unStringifyQuery,
} from '../'

describe('routes utils', () => {
  describe('getParsedId', () => {
    test('returns a parsed ID as a Number', () => {
      expect(getParsedId({
        params: {
          id: '56',
        },
      })).toEqual(56)
    })
  })

  describe('unStringifyQuery', () => {
    test('returns an empty object if there is no query string', () => {
      expect(unStringifyQuery(null)).toEqual({})
      expect(unStringifyQuery('?foo=bar&blah=ball')).toMatchSnapshot()
    })
  })
})
