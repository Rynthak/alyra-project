'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ORBITDB_ADDRESS: '"/orbitdb/Qmea5zfeGu6KQUHEeyZ5CKA3EVQiL5nxMhpxxoHXY43Lit/dapp-sells"',
  API_URL: '"http://localhost:3000"'
})
