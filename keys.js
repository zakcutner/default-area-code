const CLIENT_PATH = 'client.key'
const ACCESS_PATH = 'access.key'
const REFRESH_PATH = 'refresh.key'

const fs = require('fs')

class Key {
  constructor(path) {
    this.path = path
  }

  get() {
    return fs.readFileSync(this.path, 'utf8')
  }

  set(value) {
    fs.writeFileSync(this.path, value, 'utf8')
  }
}

module.exports = {
  client: new Key(CLIENT_PATH),
  access: new Key(ACCESS_PATH),
  refresh: new Key(REFRESH_PATH)
}
