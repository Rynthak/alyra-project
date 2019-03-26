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




export default {
  data() {
    return {
      /*ipfsDBREADY: false,
      ipfs: null,
      orbitdb: null, 
      docstore: null, */
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

    console.log("dispatching getOrbitDbInstance");
    this.$store.dispatch("getOrbitDbInstance");
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      console.log(JSON.stringify(this.form));

      this.$store.state.contractInstance().owner((err, result) => {
        if (err) {
          console.log(err);
          //this.pending = false;
        } else {
            console.log(result);
        }
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