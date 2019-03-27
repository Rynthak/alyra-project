import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'

let getOrbitDb = new Promise(function (resolve, reject) {
   let ipfs = new IPFS({
      host: 'ipfs.infura.io', 
      port: 5001, 
      protocol: 'https',
      EXPERIMENTAL: {
        pubsub: true
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