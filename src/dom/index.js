import _ from 'lodash'

/**
 * Generates a link DOM tag.
 *
 * @param {Object} opts
 * @param {String} opts.href
 * @param {String} [opts.onloadFn]
 * @param {String} [opts.rel]
 * @returns {DOMElement}
 */
export function generateLink(opts) {
  const {
    href,
    onloadFn = null,
    rel = 'stylesheet',
  } = opts
  const link = document.createElement('link')
  link.rel = rel
  link.href = href

  if (onloadFn) {
    link.onload = onloadFn
  }

  return link
}

/**
 * Generates a script DOM tag.
 *
 * @param {Object} opts
 * @param {String} opts.scriptText
 * @returns {DOMElement}
 */
export function generateScript(opts) {
  const {
    scriptText,
  } = opts
  const script = document.createElement('script')
  script.appendChild(document.createTextNode(scriptText))

  return script
}

/**
 * Generates a style DOM tag.
 *
 * @param {Object} opts
 * @param {String} opts.css
 * @returns {DOMElement}
 */
export function generateStyle(opts) {
  const {
    css,
  } = opts
  const style = document.createElement('style')
  style.type = 'text/css'
  style.appendChild(document.createTextNode(css))

  return style
}

/**
 * Inserts a script into the DOM.
 *
 * @param {Object} opts
 * @param {String} [opts.async]
 * @param {String} opts.id
 * @param {Function} [opts.onloadFn]
 * @param {String} opts.src
 */
export function insertScript(opts) {
  const {
    async = true,
    id,
    onloadFn = null,
    src,
  } = opts

  if (document.getElementById(id)) {
    return
  }

  const scriptEl = document.createElement('script')
  scriptEl.id = id
  scriptEl.src = src
  if (async) {
    scriptEl.async = 1
  }
  if (_.isFunction(onloadFn)) {
    scriptEl.onload = onloadFn
  }

  const firstJsEl = document.getElementsByTagName('script')[0]
  firstJsEl.parentNode.insertBefore(scriptEl, firstJsEl)
}
