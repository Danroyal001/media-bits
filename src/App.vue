<template>
  <div style="width: 100%; height:100%; margin: 0; padding: 0;">
  <div class="navbar-fixed">
    <nav class="teal">
      <div class="container">
        <div class="nav-wrapper">
          <a href="#" class="brand-logo">MEDIA-BITS</a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="javascript:void()">HOME</a></li>
            <li><a href="javascript:void()">EDITOR</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <ul class="sidenav" id="mobile-demo">
    <li><a href="javascript:void()">HOME</a></li>
    <li><a href="javascript:void()">EDITOR</a></li>
  </ul>

  </div>
</template>

<style src="@/assets/css/materialize.css"></style>

<script>
import * as M from '@/assets/js/materialize.js';

export default {
  name: 'App',
  mounted(){
    return M.AutoInit();
  }
}
</script>
