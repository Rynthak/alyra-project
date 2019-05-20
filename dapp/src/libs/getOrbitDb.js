import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'

let getOrbitDb = new Promise(function (resolve, reject) {
    let ipfs = new IPFS({
        EXPERIMENTAL: {
          pubsub: true
        },
        config: {
            Addresses: {
              Swarm: [              
                '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',              
                "/ip4/107.170.133.32/tcp/4001/ipfs/QmUZRGLhcKXF1JyuaHgKm23LvqcoMYwtb9jmh8CkP4og3K",
                "/ip4/139.59.174.197/tcp/4001/ipfs/QmZfTbnpvPwxCjpCG3CXJ7pfexgkBZ2kgChAiRJrTK1HsM",
                "/ip4/139.59.6.222/tcp/4001/ipfs/QmRDcEDK9gSViAevCHiE6ghkaBCU7rTuQj4BDpmCzRvRYg",
                "/ip4/46.101.198.170/tcp/4001/ipfs/QmePWxsFT9wY3QuukgVDB7XZpqdKhrqJTHTXU7ECLDWJqX",
                "/ip4/198.46.197.197/tcp/4001/ipfs/QmdXiwDtfKsfnZ6RwEcovoWsdpyEybmmRpVDXmpm5cpk2s",
                "/ip4/198.46.197.197/tcp/4002/ipfs/QmWAm7ZPLGTgofLXZgoAzEaNkYFPsaVKKGjWscE4Fbec9P"
              ]
            }
          }
      })
    ipfs.on('ready', async () => {
        let result = {}
        let orbitdb = new OrbitDB(ipfs)    
        result.docstore = await orbitdb.open(process.env.ORBITDB_ADDRESS);
        await result.docstore.load()        
        result.categories=await result.docstore.get('categories').shift().categories;
        resolve(result)
    })
})
export default getOrbitDb