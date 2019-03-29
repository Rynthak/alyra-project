<template>
  <div class="categorie">
    <div class="container">
      <h1 v-if="categorie">{{ msg }} {{ categorie.label }}</h1>
      <h1 v-else>{{ msg }}</h1>
    </div>
    <div class="container">              
        <AdsBox :listing="listing"></AdsBox>
    </div>
  </div>
</template>

<script>
import AdsBox from "./AdsBox";
export default {
  name: "Categorie",
  data() {
    return {
      msg: "Categorie listing : ",
      categorie: null,
      listing: []
    };
  },
  components: {
    AdsBox
  },
  methods: {
    getCategorie() {
      for (var key in this.$store.state.orbitDbInstance.categories) {
        if (
          this.$store.state.orbitDbInstance.categories[key].id ==
          this.$route.params.id
        ) {
          this.categorie = this.$store.state.orbitDbInstance.categories[key];
          break;
        }
      }
    },

    getListing() {
      this.listing = this.$store.state.orbitDbInstance
        .docstore()
        .query(
          doc => doc.categorie == this.$route.params.id && doc.status == 1
        );
    }
  },
  mounted() {
    this.getCategorie();
    this.getListing();
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type == "registerObitDbInstance") {
        this.getCategorie();
        this.getListing();
      }
    });
  }
};
</script>
 
