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
        EXPERIMENTAL: {
          pubsub: true
        },
        relay: {
            enabled: true,
            hop: {
              enabled: true,
              active: false
            }
          },
          config: {
                Addresses: {
                  Swarm: [
                    // Use IPFS dev signal server
                    // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
                    '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
                    // Use local signal server
                    // '/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
                    "/ip4/107.170.133.32/tcp/4001/ipfs/QmUZRGLhcKXF1JyuaHgKm23LvqcoMYwtb9jmh8CkP4og3K",
                    "/ip4/139.59.174.197/tcp/4001/ipfs/QmZfTbnpvPwxCjpCG3CXJ7pfexgkBZ2kgChAiRJrTK1HsM",
                    "/ip4/139.59.6.222/tcp/4001/ipfs/QmRDcEDK9gSViAevCHiE6ghkaBCU7rTuQj4BDpmCzRvRYg",
                    "/ip4/46.101.198.170/tcp/4001/ipfs/QmePWxsFT9wY3QuukgVDB7XZpqdKhrqJTHTXU7ECLDWJqX",
                    "/ip4/198.46.197.197/tcp/4001/ipfs/QmdXiwDtfKsfnZ6RwEcovoWsdpyEybmmRpVDXmpm5cpk2s",
                    "/ip4/198.46.197.197/tcp/4002/ipfs/QmWAm7ZPLGTgofLXZgoAzEaNkYFPsaVKKGjWscE4Fbec9P"
                  ]
                },
                //Bootstrap: [
                //  "/ip4/198.46.197.197/tcp/4001/ipfs/QmdXiwDtfKsfnZ6RwEcovoWsdpyEybmmRpVDXmpm5cpk2s",
                //  "/ip4/198.46.197.197/tcp/4002/ipfs/QmWAm7ZPLGTgofLXZgoAzEaNkYFPsaVKKGjWscE4Fbec9P"
                //]
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
 