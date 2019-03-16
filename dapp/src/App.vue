<template>
  <div id="app">
    <TopMenu></TopMenu>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import Menu from './components/Menu';
export default {
  components: {'TopMenu':Menu},
  name: 'App'
}
</script>

<style>
    .main-content {
        padding:20px 40px;
    }
    
</style>
