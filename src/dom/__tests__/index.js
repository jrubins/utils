import {
  generateLink,
  generateScript,
  generateStyle,
} from '../'

describe('dom utils tests', () => {
  describe('generateLink', () => {
    const href = 'test link'

    test('generates a link DOM tag and defaults to stylesheet', () => {
      const link = generateLink({
        href,
      })

      expect(link.href).toEqual(href)
      expect(link.rel).toEqual('stylesheet')
    })

    test('generates a link DOM tag with a custom onloadFn', () => {
      const onloadFn = () => {} // eslint-disable-line no-empty-function
      const link = generateLink({
        href,
        onloadFn,
      })

      expect(link.onload).toEqual(onloadFn)
    })
  })

  describe('generateScript', () => {
    test('generates a script DOM tag with the provided text', () => {
      const scriptText = 'const tests = "fun";'
      const script = generateScript({
        scriptText,
      })

      expect(script.innerHTML).toEqual(scriptText)
    })
  })

  describe('generateStyle', () => {
    test('generates a style DOM tag with the provided CSS', () => {
      const css = 'body { margin: 15; padding: 30px; }'
      const style = generateStyle({
        css,
      })

      expect(style.innerHTML).toEqual(css)
    })
  })
})
