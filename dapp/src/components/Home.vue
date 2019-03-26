<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
     <div class="col-xs-12 content-box layout-section">  
        <b-row class="row-featured row-featured-category">
            <b-col cols="12" md="3" lg="2" sm="2" xs="4"  class="f-category">
                <a><font-awesome-icon :icon="[ 'fas', 'coffee' ]"  size="6x"/>
                    <h6>Multimédia</h6>
                    </a>
            </b-col>
        </b-row>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.layout-section {
    margin-bottom: 0;
}
.content-box {
    box-shadow: none;
    border: 1px solid #ddd;
}
.content-box {
    background: #fff;
    border-radius: 3px;
    display: block;
    position: relative;
    width: 100%;
    box-shadow: 0 1px 1px rgba(180,180,180,.5);
    overflow: hidden;
    margin-bottom: 30px;
}
.row-featured-category {
    margin-bottom: -1px;
}
.row-featured {
    overflow: hidden;
    margin-right: -16px;
}
.f-category {
    border-color: #f5f5f5 #f5f5f5 #f5f5f5 -moz-use-text-color;
    border: solid 1px #f5f5f5;
    padding: 25px 15px;
}
.f-category {
    border: solid 1px #ddd;
    margin-top: -1px;
    border-left: 0;
    background: #fff;
    padding: 15px;
    text-align: center;
    overflow: hidden;
    display: block;
}
</style>
