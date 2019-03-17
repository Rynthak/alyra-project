<template>
 <div id="app">
    <TopMenu></TopMenu>      
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Menu from './components/Menu';
import Footer from './components/Footer';
export default {
  components: {'TopMenu':Menu,'Footer':Footer},
  name: 'App'
}
</script>

