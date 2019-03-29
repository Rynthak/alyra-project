/*
  orbitDB test

  Creates a publically writable DB.
  Adds a series of test key-value pairs.
*/

"use strict"

const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
let ipfs // handle for IPFS instance.
let db // handle for orbit DB.
const configCategories = require('../assets/categories.json');
const util = require("util");
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
};


module.exports = {
  openDb
}


// OrbitDB uses Pubsub which is an experimental feature
// and need to be turned on manually.
// Note that these options need to be passed to IPFS in
// all examples in this document even if not specfied so.
const ipfsOptions = {
    host: 'ipfs.infura.io', 
      port: 5001, 
      protocol: 'https',
  EXPERIMENTAL: {
    pubsub: true
  },
  relay: {
      enabled: true,
      hop: {
        enabled: true,
        active: false
      }
 }
    
}

// Returns a promise that resolves to a handle of the DB.
function openDb() {
  return new Promise(function(resolve, reject) {

      // Create IPFS instance
      ipfs = new IPFS(ipfsOptions)

      ipfs.on('ready', async () => {
        //ipfs.swarm.connect('/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star');
       
        // Create OrbitDB instance
        const orbitdb = new OrbitDB(ipfs)

        const access = {
          // Give write access to who boostrap the node
          write: [orbitdb.key.getPublic('hex')],
        }

        // Load the DB.
        db = await orbitdb.docstore('dapp-sells-docstore', access)
        await db.load()

        console.log(`database string: ${db.address.toString()}`)
        console.log(`db public key: ${db.key.getPublic('hex')}`)

        db.put(configCategories);  


        // React when the database is updated.
        db.events.on('replicated', () => {
          console.log(`Databse replicated. Check for new ads.`)
        })

          


        return resolve(db);
      })

    
  }).catch( function (err ){
       console.log(err);
        
  })
}
 