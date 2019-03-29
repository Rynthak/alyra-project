<template>
  <div class="search">
    <div class="container">
      <h1>{{ msg }}</h1>
    </div>
    <div class="container">
      <div class="col-xs-12 content-box layout-section">
        <b-form @submit="onSubmit">
          <b-form-group
            id="adsCitieGroup"
            label="Ads Citie:"
            label-for="adsCitie"
            description="Select your citie"
          >
            <v-select
              :filterable="false"
              :options="citiesoptions"
              v-model="form.city"
              label="name"
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
            id="adsCategorieGroup"
            label="Ads Categorie:"
            label-for="adsTitle"
            description="Select the ADS categorie"
          >
            <b-form-select
              id="Categorie"
              v-model="form.categorie"
              type="select"
              placeholder="Select a categorie"
            >
              <!-- This slot appears above the options from 'options' prop -->
              <template slot="first">
                <option :value="null" disabled>-- Please select an categorie --</option>
              </template>
              <option
                v-for="categorie in categories"
                :value="categorie.id"
                :key="categorie.id"
              >{{ categorie.label }}</option>
            </b-form-select>
          </b-form-group>

          <b-button type="submit" variant="primary">Search</b-button>
        </b-form>
       
          <AdsBox :listing="listing"></AdsBox>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { APIAdsService } from "../services/APIAdsService";
import _ from "lodash";
const apiService = new APIAdsService();
import AdsBox from "./AdsBox";
export default {
  name: "Search",
  data() {
    return {
      msg: "Search listing",
      listing: [],
      citiesoptions: [],
      categories: [],
      form: {
        categorie: "",
        city: ""
      }
    };
  },
  components: {
    AdsBox
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
    getCategories() {
      if (typeof this.$store.state.orbitDbInstance != undefined)
        this.categories = this.$store.state.orbitDbInstance.categories;
    },
    onSubmit(evt) {
      evt.preventDefault();
      let condition = "doc.status==1 ";
      if (this.form.categorie != "") {
        condition += ' && "' + this.form.categorie + '" == doc.categorie';
      }
      if (this.form.city != "" && this.form.city != null) {
        condition +=
          ' && "' +
          this.form.city.name +
          '" == doc.city.name && "' +
          this.form.city.country +
          '" == doc.city.country ';
      }
      this.listing = this.$store.state.orbitDbInstance.docstore().query(doc => {
        return eval(condition);
      });
    }
  }
};
</script> 
