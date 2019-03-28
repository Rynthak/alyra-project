<template>
  <div class="single-ads-list">
    <b-media tag="li">
      <h5 class="mt-0 mb-1">{{ ads.title }}</h5>
    </b-media>
  </div>
</template>
<script>
export default {
  name: "single-ads-list",
  props: ['ads'],
  data() {
    return {
      msg: "Single Ads"
    };
  }
};
</script> 
