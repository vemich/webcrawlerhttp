const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { text, expect } = require('@jest/globals')

// to run type 'npm test'

/*
Example: normalize URL if they are the same url
'http://boot.dev', normalize to -> 'boot.dev'
'http://boot.dev', -> 'boot.dev'
'https://boot.dev' -> 'boot.dev'
*/

test('normalizeURL strip protocol', () => {
  const input = 'https://blog.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
  const input = 'https://blog.boot.dev/path/'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
  const input = 'https://BLOG.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
  const input = 'http://blog.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
  const inputHTMLBody = `
  <html>
    <body>
        <a href="https://blog.boot.dev/path/">Boot.dev Blog</a>
    </body>
  </html>
  `
  const inputBaseURL = 'https://blog.boot.dev/path/'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = ['https://blog.boot.dev/path/']
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
  const inputHTMLBody = `
  <html>
    <body>
        <a href="/path/">Boot.dev Blog</a>
    </body>
  </html>
  `
  const inputBaseURL = 'https://blog.boot.dev'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = ['https://blog.boot.dev/path/']
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
  const inputHTMLBody = `
  <html>
    <body>
        <a href="https://blog.boot.dev/path1/">Boot.dev Blog Path One</a>
        <a href="/path2/">Boot.dev Blog Path Two</a>
    </body>
  </html>
  `
  const inputBaseURL = 'https://blog.boot.dev'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/']
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid', () => {
  const inputHTMLBody = `
  <html>
    <body>
        <a href="invalid">Invalid URL</a>
    </body>
  </html>
  `
  const inputBaseURL = 'https://blog.boot.dev'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = []
  expect(actual).toEqual(expected)
})
