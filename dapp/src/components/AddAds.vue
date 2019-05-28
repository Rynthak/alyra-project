<template>
  <b-container>
    <h1 class="title">Add new AD</h1>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="adsCategorieGroup"
        label="category:"
        label-for="adsTitle"
        description="Please select the category"
      >
        <b-form-select
          id="Categorie"
          type="select"
          v-model="form.categorie"
          required
          placeholder="Please select a category"
        >
          <!-- This slot appears above the options from 'options' prop -->
          <template slot="first">
            <option :value="null" disabled>-- Please select a category --</option>
          </template>
          <option
            v-for="categorie in categories"
            :value="categorie.id"
            :key="categorie.id"
          >{{ categorie.label }}</option>
        </b-form-select>
      </b-form-group>

      <b-form-group
        id="adsPhoneGroup"
        label="Phone:"
        label-for="adsPhone"
        description="Please enter your phone number"
      >
        <vue-tel-input required @onInput="onInput" :preferredCountries="['fr']"></vue-tel-input>
      </b-form-group>

      <b-form-group
        id="adsCitieGroup"
        label="City:"
        label-for="adsCitie"
        description="Please select your city"
      >
        <v-select
          :filterable="false"
          :options="citiesoptions"
          label="name"
          v-model="form.city"
          @search="onSearch"
        >
          <template slot="no-options">type to search cities..</template>
          <template slot="option" slot-scope="option">
            <div class="d-center">
              <flag :iso="option.country"/>
              {{ option.name }}
            </div>
          </template>
          <template slot="selected-option" slot-scope="option">
            <div class="selected d-center">
              <flag :iso="option.country"/>
              {{ option.name }}
            </div>
          </template>
        </v-select>
      </b-form-group>

      <b-form-group
        id="adsTitleGroup"
        label="Title:"
        label-for="adsTitle"
        description="Please enter a title"
      >
        <b-form-input
          id="adsTitle"
          type="text"
          v-model="form.title"
          required
          placeholder="Enter a Title"
        />
      </b-form-group>

      <b-form-group
        id="adsPriceGroup"
        label="Price:"
        label-for="adsPrice"
        prepend="$"
        description="Please enter a price(optional)"
      >
        <b-form-input
          id="adsPrice"
          type="number"
          v-model="form.price"
          placeholder="Enter a price"
        />
      </b-form-group>

      <b-form-group
        id="adsDescriptionGroup"
        label="Description:"
        label-for="adsDescription"
        description="Please enter the description"
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
        label="Pictures:"
        label-for="adsPictures"
        description="Please upload pictures"
      >
        <b-form-file
          id="adsPictures"
          v-model="form.pictures"
          :state="Boolean(form.pictures)"
          placeholder="Choose a picture..."
          drop-placeholder="Drop file here..."
          :multiple="Boolean(true)"
          accept="image/*"
        />
      </b-form-group>

      <button class="btn btn-primary">Add new AD</button>
      <strong v-show="submitting">Submitting...</strong>
      <p v-show="successMessage" class="text-success">
        <strong>You've been registerd!</strong>
        <br>You will be redirected to categorie page
        <strong>once the block will be mined!</strong>
      </p>
    </b-form>
  </b-container>
</template>
<script>
import { APIAdsService } from "../services/APIAdsService";
import _ from "lodash";
const apiService = new APIAdsService();
export default {
  data() {
    return {
      form: {
        title: "",
        description: "",
        pictures: null,
        categorie: "",
        price: "",
        phone: {
          number: "",
          isValid: false,
          country: undefined
        },
        city: ""
      },
      citiesoptions: [],
      categories: [],
      show: true,
      submitting: false,
      successMessage: false
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type == "registerObitDbInstance") {
        this.getCategories();
      }
    });
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    onSearch(search, loading) {
      loading(true);
      this.searchCitie(loading, search, this);
    },
    searchCitie: _.debounce((loading, search, vm) => {
      apiService.getCitie(search).then(
        result => {
          vm.citiesoptions = result.data.items;
          loading(false);
        },
        error => {
          console.log(error);
        }
      );
    }, 350),
    onInput({ number, isValid, country }) {
      this.form.phone.number = number;
      this.form.phone.isValid = isValid;
      this.form.phone.country = country;
    },
    getCategories() {
      if (typeof this.$store.state.orbitDbInstance != undefined)
        this.categories = this.$store.state.orbitDbInstance.categories;
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.submitting = true    
      this.successMessage = false

      //Form is valid , we add the new ads to the orbitDB database
      //Call the express server with orbit DB
      let formData = new FormData();

      formData.append("title", this.form.title);
      formData.append("description", this.form.description);
      formData.append("categorie", this.form.categorie);
      formData.append("phone", JSON.stringify(this.form.phone));
      formData.append("city", JSON.stringify(this.form.city));
      if (this.form.price) {
        formData.append("price", this.form.price);
      }

      for (var i = 0; i < this.form.pictures.length; i++) {
        let file = this.form.pictures[i];
        formData.append("files[" + i + "]", file);
      }
      this.submitting = false;     
      apiService.createAds(formData).then(
        result => {
          //Get New ADS added to orbitDB
          this.$store.state.contractInstance().payNewAds(
            result.data._id,
            {
              value: this.$store.state.web3
                .web3Instance()
                .toWei("0.1", "ether"),
              from: this.$store.state.web3.coinbase
            },
            (err, result) => {
              if (err) {
                console.log(err);
                //this.pending = false;
              } else {
                console.log(result);
                this.successMessage = true
                this.$router.push("/")
              }
            }
          );
        },
        error => {
          console.log(error);
        }
      );
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.title = "";
      this.form.description = "";
      this.form.categorie = "";
      this.form.pictures = null;
      this.form.phone = {
        number: "",
        isValid: false,
        country: undefined
      };
      this.form.city = "";
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>