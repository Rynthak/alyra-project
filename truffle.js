require('dotenv').config();
var HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = process.env["MNEMONIC"];
const API_KEY = process.env["API_KEY"];
module.exports = {
    contracts_build_directory: "./dapp/src/assets/contracts",
    networks: {
        ganache: {
            host: "127.0.0.1",
            port: 9545,
            network_id: "5777"
        },
        ropsten: {
            provider: function () {
                return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/"+API_KEY)
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