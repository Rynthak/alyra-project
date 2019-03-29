# craiglist-dapp

 

## Installation

```sh
npm install 
```

## Contract Compilation

#### Update configuration
```sh 
cp .env.sample .env
```
Don't commit .env  
Replace MNEMONIC by your mnenonic of your private key  
Replace API_KEY with infura api key , you can get one here ([infura.io](https://infura.io/))




#### Deploy contract on ropsten
```sh 
npm install 
npx truffle migrate ––reset ––compile-all --network ropsten
```

For adding new network just edit truffle.js

Copy Contracts builds into backend app too

```sh 
cp -r ./dapp/src/assets/contracts/ ./backend-dapp/assets/contracts/
```

## Backend install

#### install backend

```sh 
cd backend-dapp
npm install
```
#### update config
```sh 
cp .env.sample .env
```
Replace API_KEY with infura api key , you can get one here ([infura.io](https://infura.io/))  
Replace networkid with the id of network where the contracs were deployed  

#### run backend
```sh 
npm run start
```
Copy the database string for for update frontend config , ex : **database string: /orbitdb/QmAwesomeHash/dapp-sells-docstore**    
Backend app will start on **http://localhost:3000/**  

## Frontend install

```sh 
cd dapp
npm install
```

#### update config

for dev env.

```sh 
 cp config/dev.env.js.sample  config/dev.env.js
```
Replace **ORBITDB_ADDRESS** with the OrbitDb from the backend
Replace **API_URL** with the backend url , ex : **http://localhost:3000/**  

#### run frontend
```sh 
npm run dev
```
frontend will be  available under **http://localhost:8080/**

## Dependencies

- [@vue/cli](https://ghub.io/@vue/cli): Command line interface for rapid Vue.js development
- [body-parser](https://ghub.io/body-parser): Node.js body parsing middleware
- [cors](https://ghub.io/cors): Node.js CORS middleware
- [dotenv](https://ghub.io/dotenv): Loads environment variables from .env file
- [express](https://ghub.io/express): Fast, unopinionated, minimalist web framework
- [ipfs](https://ghub.io/ipfs): JavaScript implementation of the IPFS specification
- [morgan](https://ghub.io/morgan): HTTP request logger middleware for node.js
- [nodemon](https://ghub.io/nodemon): Simple monitor script for use during development of a node.js app.
- [openzeppelin-solidity](https://ghub.io/openzeppelin-solidity): Secure Smart Contract library for Solidity
- [orbit-db](https://ghub.io/orbit-db): Distributed p2p database on IPFS
- [orbit-db-cli](https://ghub.io/orbit-db-cli): CLI for OrbitDB - A distributed p2p database on IPFS
- [truffle-hdwallet-provider](https://ghub.io/truffle-hdwallet-provider): HD Wallet-enabled Web3 provider
- [webpack](https://ghub.io/webpack): Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jsx, es7, css, less, ... and your custom stuff.

## Dev Dependencies

None

## License

ISC
