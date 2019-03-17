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
            />

            <pre class="mt-3 mb-0">{{ text }}</pre>
        </b-form-group>




        <button class="btn btn-primary" :disabled="disableSubmit" @click="performSubmit">Add new ADS</button>
        <strong v-show="submitting">Submitting...</strong>
        <strong v-show="errorSubmit" class="text-danger">Error occurred!</strong>

        <p v-show="successMessage" class="text-success">
          <strong>Ads successfully added</strong>
          <br>You will be redirected to the ads page
          <strong>once the block will be mined!</strong>
        </p>
      </b-form>
    
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      form: {
        title: "",
        description:""
        
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>