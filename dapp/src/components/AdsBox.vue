<template>
<div class="ads-box">
     <ul class="list-unstyled">
        <template v-for="ads in listing">
            <single-ads-list :ads="ads"></single-ads-list>
        </template>
    </ul>
</div>
</template>
<script>
import SingleAdsList from "./SingleAdsList";
export default {
  name: "AdsBox",
  props: ["listing"],
  data() {
    return {
    };
  },
  components: {
    SingleAdsList
  }   
};
</script>