<template>
  <div class="singleads">
      <div class="container">
                <div v-if="ads">
        <b-jumbotron>
            <template slot="header">{{ ads.title }}</template>

            <template slot="lead"></template>

            <hr class="my-4">

            <p>{{ ads.description }}</p>
            <div id="carouselExampleIndicators" v-if="ads.files.length" class="carousel slide" data-ride="carousel">
                 
                <div class="carousel-inner">
                    <div :class="['carousel-item',(index === 0 ? 'active' : '')]" v-for="(file, index) in ads.files" :key="file.hash">
                        <img class="d-block w-100"  :src="'https://ipfs.io/ipfs/'+file.shift().hash" >
                    </div>
                    
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
           
        </b-jumbotron>

        </div>


      </div>
  </div>
</template>
<script>
export default {
  name: "SingleAds",
  data() {
    return {
      msg: "Single Ads",       
      ads:null, 
    };
  },
  methods: {
       getAds() {
            this.ads=this.$store.state.orbitDbInstance.docstore().get(this.$route.params.id).shift();
            console.log(this.ads)            
       }
  },
  mounted(){      
    this.getAds();    
  },
  created() {
      
     this.$store.subscribe((mutation, state) => {
           if(mutation.type=='registerObitDbInstance'){
                this.getAds();                 
           }
    });

  },
};
</script> 
