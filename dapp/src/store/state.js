let state = {
  web3: {
    isInjected: false,
    web3Instance: null,
    networkId: null,
    coinbase: null,
    balance: null,
    error: null
  },
  contractInstance: null,
  ipfs:null,
  orbitDbInstance:{
      docstore : null,
      categories : null
  }
  
}
export default state
