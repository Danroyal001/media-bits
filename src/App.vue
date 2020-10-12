<template>
  <div style="width: 100% !important; height:100% !important; margin: 0; padding: 0;">
  <div class="navbar-fixed">
    <nav class="teal">
      <div class="container">
        <div class="nav-wrapper">
          <a href="#" class="brand-logo">
            <img src="@/assets/logo.png" style="height: 50px; padding-top: 21px;">
            <span class="hide-on-small-only">{{ $store.state.appName }}</span>
          </a>
          <a href="#" data-target="sidenav" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li v-for="link in $store.state.primaryHyperlinks" :key="link.name"><router-link :to="link.href">{{ link.name }}</router-link></li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <ul class="sidenav" id="sidenav">
    <li v-for="link in $store.state.primaryHyperlinks" :key="link.name"><router-link :to="link.href">{{ link.name }}</router-link></li>
  </ul>
  
  <router-view />

  </div>
</template>

<style src="@/assets/css/materialize.css"></style>

<style>
.position-absolute{
  position: absolute !important;
}
</style>

<script>
import * as M from '@/assets/js/materialize.min.js';

window.M = M;

export default {
  name: 'App',
  mounted(){
    return window.M.AutoInit();
  }
}
</script>
