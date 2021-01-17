const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  const app = new Vue({
    data: function () {
      return {
        url: req.url,
      }
    },
    template: '<div>The visited url is {{ url }}</div>',
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      return res.status(500).end('Internal Server Error')
    }
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  })
})

server.listen(8080)
