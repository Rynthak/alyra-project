require('dotenv').config();
var HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = process.env["MNEMONIC"]; 
module.exports = {
    contracts_build_directory: "./dapp/src/assets/contracts",
    networks: {
        ganache: {
            provider: function () {
                return new HDWalletProvider(MNEMONIC, process.env["GANACHE_PROVIDER"])
            },
            network_id: "5777"
        },
        ropsten: {
            provider: function () {
                return new HDWalletProvider(MNEMONIC, process.env["ROPSTEN_PROVIDER"])
            },
            network_id: 3,
            gas: 4000000 //make sure this gas allocation isn't over 4M, which is the max
        }
    },
    compilers: {
        solc: {
            version: "0.5.3", // Fetch exact version from solc-bin (default: truffle's version)
            optimizer: {
                enabled: false,
                runs: 200
            }
        }
    }
};