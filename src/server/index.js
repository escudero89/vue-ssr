const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', async (req, res) => {
  const app = new Vue({
    data: function () {
      return {
        url: req.url,
      }
    },
    template: '<div>The visited url is {{ url }}</div>',
  })

  try {
    const html = await renderer.renderToString(app)

    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  } catch (err) {
    res.status(500).end('Internal Server Error')
  }
})

server.listen(8080)
