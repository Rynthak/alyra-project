<template>
  <div class="categorie">
    <div class="container">
        <h1 v-if="categorie">{{ msg }} {{ categorie.label }} </h1>
        <h1 v-else>{{ msg }}</h1>
    </div>
    <div class="container">
        <ul class="list-unstyled">
       
           <b-media tag="li" v-for="ads in listing" :key="ads.id">
                <b-img slot="aside" blank blank-color="#abc" width="64" alt="placeholder" />

                <h5 class="mt-0 mb-1">{{ ads.title }}</h5>
                <p class="mb-0">{{ ads.description  }} Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
            </b-media>
        
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Categorie",
  data() {
    return {
      msg: "Categorie listing : ",       
      categorie:null,
      listing : []
    };
  } ,
 
  methods: {
       getCategorie() {
           for(var key in this.$store.state.orbitDbInstance.categories ){
               
                if(this.$store.state.orbitDbInstance.categories[key].id==this.$route.params.id){
                        this.categorie=this.$store.state.orbitDbInstance.categories[key];
                        break;
                }
           }

       },

       getListing(){
            this.listing=this.$store.state.orbitDbInstance.docstore().query((doc)=> doc.categorie==this.$route.params.id);
            console.log(this.listing);
       }
  },
  mounted(){
    this.getCategorie();
    this.getListing();    
  },
  created() {
      
     this.$store.subscribe((mutation, state) => {
           if(mutation.type=='registerObitDbInstance'){
                 this.getCategorie();
                 this.getListing();                   
           }
    });

  },
};
</script>
 
