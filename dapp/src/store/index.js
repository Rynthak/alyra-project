import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'

import getWeb3 from '../libs/getWeb3'
import getContract from '../libs/getContract'
import getOrbitDb from '../libs/getOrbitDb'

Vue.use(Vuex)
export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    registerWeb3Instance (state, payload) {
      console.log('registerWeb3instance Mutation being executed', payload)
      let result = payload
      let web3Copy = state.web3
      web3Copy.coinbase = result.coinbase
      web3Copy.networkId = result.networkId
      web3Copy.balance = parseInt(result.balance, 10)
      web3Copy.isInjected = result.injectedWeb3
      web3Copy.web3Instance = result.web3
      state.web3 = web3Copy
    },

    registerContractInstance (state, payload) {
      console.log('Dapp contract instance address: ', payload.address)
      state.contractInstance = () => payload
    },
    registerObitDbInstance(state,payload){
        console.log('Orbit DB instance ID: ', payload.id)
        state.orbitDbInstance = () => payload
    }

  },
  actions: {
    registerWeb3 ({
      commit
    }) {
      console.log('registerWeb3 Action being executed')
      getWeb3.then(result => {
        console.log('committing result to registerWeb3Instance mutation')
        commit('registerWeb3Instance', result)
      }).catch(e => {
        console.log('error in action registerWeb3', e)
      })
    },
    getContractInstance ({
      commit
    }) {
      getContract.then(result => {
        commit('registerContractInstance', result)
      }).catch(e => console.log(e))
    },
    getOrbitDbInstance ({
      commit
    }) {
      getOrbitDb.then(result => {
        commit('registerObitDbInstance', result)
      }).catch(e => console.log(e))
    }

  }
})
