const HOSTNAME = process.env.npm_package_config_hostname || 'localhost'
const PORT = process.env.npm_package_config_port || 3000

const keys = require('./keys')

const http = require('http')
const fs = require('fs')
const url = require('url')

const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

let oauth2Client

http.createServer((req, res) => {
  const query = url.parse(req.url, true).query

  if ('code' in query) {
    try {
      oauth2Client.getToken(query.code, (err, tokens) => {
        if (err) throw err
        keys.access.set(tokens.access_token)
        keys.refresh.set(tokens.refresh_token)
      })
    } catch (err) {
      console.error(err.toString())
      res.writeHead(500)
      return res.end('Internal Server Error')
    }

    res.writeHead(200)
    res.end('OK')
  } else {
    oauth2Client = new OAuth2(
      '1033270119288-8v3lbmmhpdtk032fi3sam5up91pok4qe.apps.googleusercontent.com',
      keys.client.get(),
      'http://' + HOSTNAME + ':' + PORT
    )

    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/contacts'],
      prompt: 'consent'
    })

    res.writeHead(302, { 'location': url })
    res.end()
  }
}).listen(PORT, err => {
  if (err) throw err
  console.log('Server listening on port ' + PORT)
})
