<template>
  <div id="app">
    <TopMenu></TopMenu>    
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Menu from './components/Menu'
import Footer from './components/Footer'
export default {
  components: { TopMenu: Menu, Footer: Footer },
  name: 'App',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched')
    this.$store.dispatch('registerWeb3')

    console.log("dispatching getContractInstance");
    this.$store.dispatch("getContractInstance");

    console.log("dispatching getOrbitDbInstance");
    this.$store.dispatch("getOrbitDbInstance");


  }
}
</script>
