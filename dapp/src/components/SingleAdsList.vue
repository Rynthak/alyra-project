<template>
  <div class="single-ads-list">
    <b-media tag="li">
      <router-link :to="{ name: 'SingleAds', params: { id: ads._id }}">
        <a>
          <b-badge variant="primary">
            <font-awesome-icon :icon="[ 'fas', 'clock' ]" fixed-width/>
            {{ ads.date_add | moment("from", "now") }}
          </b-badge>
          <b-badge variant="warning">
            <font-awesome-icon :icon="[ 'fas', 'id-card-alt' ]" fixed-width/>
            {{  ads._id }}
          </b-badge>         
          <b-badge variant="light">
            <flag :iso="ads.city.country"/>
            {{ ads.city.name }}
          </b-badge>
          <b-badge variant="success" v-if="ads.owner.toLowerCase() == coinbase.toLowerCase()">My Ads</b-badge>
          <h5 class="mt-0 mb-1">{{ ads.title }}</h5>
        </a>
      </router-link>
    </b-media>
  </div>
</template>
<script>
export default {
  name: "single-ads-list",
  props: ["ads"],
  data() {
    return {
      msg: "Single Ads",
      coinbase: this.$store.state.web3.coinbase
    };
  }
};
</script> 
