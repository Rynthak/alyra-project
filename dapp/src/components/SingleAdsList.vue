<template>
  <div class="single-ads-list">
    <b-media tag="li">
      <router-link :to="{ name: 'SingleAds', params: { id: ads._id }}">
        <a>
          <b-badge  variant="primary"> <font-awesome-icon :icon="[ 'fas', 'clock' ]" fixed-width/>{{ ads.date_add | moment("from", "now") }}</b-badge>
           <b-badge  variant="light"> <flag :iso="ads.city.country" /> {{ ads.city.name }}</b-badge>
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
      msg: "Single Ads"
    };
  }
};
</script> 
