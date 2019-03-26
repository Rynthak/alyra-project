<template>
  <b-container>
    <h1 class="title">Add new Ads</h1>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="adsTitleGroup"
        label="Ads Title:"
        label-for="adsTitle"
        description="Please enter the ADS title"
      >
        <b-form-input
          id="adsTitle"
          type="text"
          v-model="form.title"
          required
          placeholder="Enter Ads Title"
        />
      </b-form-group>

      <b-form-group
        id="adsDescriptionGroup"
        label="Ads Description:"
        label-for="adsDescription"
        description="Please enter the ADS description"
      >
        <b-form-textarea
          id="adsDescription"
          v-model="form.description"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
          required
        />

        <pre class="mt-3 mb-0">{{ form.description }}</pre>
      </b-form-group>
      <b-form-group
        id="adsPicturesGroup"
        label="Ads Pictures:"
        label-for="adsPictures"
        description="Please upload ADS pictures"
      >
        <b-form-file
          id="adsPictures"
          v-model="form.pictures"
          :state="Boolean(form.pictures)"
          placeholder="Choose pictures picture..."
          drop-placeholder="Drop file here..."
          :multiple="Boolean(true)"
          accept="image/*"
        />
      </b-form-group>

      <button class="btn btn-primary">Add new ADS</button>
    </b-form>
  </b-container>
</template>
<script>
import {APIAdsService} from '../services/APIAdsService'
const apiService = new APIAdsService();
export default {
  data() {
    return {       
      form: {
        title: "",
        description: "",
        pictures: null
      },
      show: true
    };
  },
  mounted() {
    console.log("dispatching getContractInstance");
    this.$store.dispatch("getContractInstance");
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
       
     //Form is valid , we add the new ads to the orbitDB database
        //Call the express server with orbit DB
       apiService.createAds(this.form).then((result)=>{

         
        //Get New ADS added to orbitDB
        this.$store.state.contractInstance().payNewAds(result.data.hashBytes32,{
            value: this.$store.state.web3.web3Instance().toWei('0.1', 'ether'),
            from: this.$store.state.web3.coinbase
        },(err, result) => {
            if (err) {
            console.log(err);
            //this.pending = false;
            } else {
                console.log(result);
            }
        });

         
        },(error)=>{
            console.log(error);
        });   


      
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.title = "";
      this.form.description = "";
      this.form.pictures = null;

      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>