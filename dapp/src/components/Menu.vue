<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    
    <router-link tag="b-navbar-brand" :to="{ name: 'Home' }" exact>
          <a>
            DappSell
          </a>
        </router-link>
    <b-navbar-toggle target="nav_collapse"/>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <router-link tag="b-nav-item" :to="{ name: 'AddAds' }" exact>
          <a>
            <strong>Add new Ads</strong>
          </a>
        </router-link>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
