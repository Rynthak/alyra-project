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
        <b-form-group id="adsPicturesGroup"
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
            multiple=true
            accept="image/*"
            />
         </b-form-group>


        <button class="btn btn-primary">Add new ADS</button>
         
      </b-form>
    
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      form: {
        title: "",
        description:"",
        pictures:null
        
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      
    },
    onReset(evt) {
       
    }
  }
};
</script>