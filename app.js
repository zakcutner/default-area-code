const DEFAULT_CODE = process.env.npm_package_config_default_code || 'GB'

const keys = require('./keys')
const { parse, format } = require('libphonenumber-js')

const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

Object.prototype.isEmpty = function() {
  return Object.keys(this).length == 0
}

const oauth2Client = new OAuth2(
  '1033270119288-8v3lbmmhpdtk032fi3sam5up91pok4qe.apps.googleusercontent.com',
  keys.client.get()
)

oauth2Client.setCredentials({
  access_token: keys.access.get(),
  refresh_token: keys.refresh.get()
})

const people = google.people({
  version: 'v1',
  auth: oauth2Client
}).people

people.connections.list({
  resourceName: 'people/me',
  personFields: 'names,phoneNumbers'
}, (err, res) => {
  if (err) throw err

  res.data.connections.forEach(connection => {
    if ('phoneNumbers' in connection) {
      connection.phoneNumbers.map(phoneNumber => {
        const parsedNumber = parse(phoneNumber.value, 'GB')

        if (parsedNumber.isEmpty()) {
          console.error('Error updating contact "' +
            connection.names[0].displayName + '" : ' + phoneNumber.value)
        } else {
          phoneNumber.value = format(
            parsedNumber,
            parsedNumber.country == DEFAULT_CODE ? 'National' : 'International'
          )
        }

        return phoneNumber
      })

      people.updateContact({
        resourceName: connection.resourceName,
        updatePersonFields: 'phoneNumbers',
        resource: connection
      }, (err, _) => {
        if (err) throw err
      })
    }
  })
})

