module.exports = {
    contracts_build_directory: "./dapp/src/assets/contracts",
	networks: {
		ganache: {
			host: "127.0.0.1",
			port: 9545,
			network_id: "5777"
		}
    },
    compilers: {
    solc: {
      version: "0.5.3",    // Fetch exact version from solc-bin (default: truffle's version)
      optimizer: {
         enabled: false,
          runs: 200
      }
    }
  }
};