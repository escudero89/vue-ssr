const fs = require('fs')
const path = require('path')

const Vue = require('vue')

const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync(path.join(__dirname, '../public', 'index.template.html'), 'utf-8'),
})

server.get('*', async (req, res) => {
  const app = new Vue({
    data: function () {
      return {
        url: req.url,
      }
    },
    template: '<div>The visited URL is: {{ url }}</div>',
  })
  const context = {
    title: 'Home Page',
    meta: `
      <meta charset="UTF-8">
      <meta name="description" content="The example description">
    `,
  }

  try {
    const html = await renderer.renderToString(app, context)
    res.end(html)
  } catch (err) {
    console.error(err)
    res.status(500).end('Internal Server Error')
  }
})

server.listen(8080)
