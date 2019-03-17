<template>
 <div id="app">
    <TopMenu></TopMenu>      
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

