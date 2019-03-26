<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand :to="{ name: 'Home' }" exact>
      <font-awesome-icon :icon="[ 'fas', 'home' ]" fixed-width />HOME
    </b-navbar-brand>

    <b-navbar-toggle target="nav_collapse"/>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'AddAds' }" exact>
          <font-awesome-icon :icon="[ 'fas', 'folder-plus' ]" fixed-width />Add new Ads
        </b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item :to="{ name: 'Search' }" exact>
          <font-awesome-icon :icon="[ 'fas', 'search' ]" fixed-width />Search
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
