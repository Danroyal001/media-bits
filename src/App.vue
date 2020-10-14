<template>
  <div style="width: 100% !important; height:100% !important; margin: 0; padding: 0;">
  <div class="navbar-fixed">
    <nav class="teal">
      <div class="container">
        <div class="nav-wrapper">
          <a href="#" class="brand-logo">
            <img src="@/assets/logo.png" style="height: 50px; padding-top: 21px; padding-left: 3px; padding-right: 3px;">
            <span class="hide-on-small-only">{{ $store.state.appName }}</span>
          </a>
          <a href="#" data-target="sidenav" class="sidenav-trigger"><i class="fas fa-bars"></i></a>
          <ul id="nav-mobile" class="right hide-on-med-and-down"  v-if="$route.name !== 'editor'">
            <li v-for="link in $store.state.primaryHyperlinks" :key="link.name"><router-link :to="link.href">{{ link.name }}</router-link></li>
          </ul>
          <ul id="nav-mobile" class="right hide-on-med-and-down"  v-else-if="$route.name === 'editor'">
            <li v-for="(btn, i) in $store.state.editorBtns" :key="i"><a class="btn-small waves-effect waves-light">{{ btn.title }}</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <ul class="sidenav" id="sidenav">
    <li v-for="link in $store.state.primaryHyperlinks" :key="link.name"><router-link :to="link.href">{{ link.name }}</router-link></li>
  </ul>
  
  <!-- <transition name="view-pager">
    <keep-alive>
      <router-view />
    </keep-alive>
  </transition> -->

  <router-view v-slot="{ Component }">
    <transition name="view-pager">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>

  </div>
</template>

<style src="@/assets/css/materialize.css"></style>

<style src="@/assets/css/fontawesome.min.css"></style>

<style>
::-webkit-scrollbar{
  width: 10px !important;
}

::-webkit-scrollbar-button{
  background-color: #009688 !important;
  content: initial;
}

::-webkit-scrollbar-thumb{
  border-radius: 100px !important;
  background: #008688 !important;
}

::-webkit-scrollbar-track{
  background: #000000;
  border: thin solid #ffffff;
}

.position-absolute{
  position: absolute !important;
}

.flex-center{
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-pager-enter-active{
  position:relative;animation:viewPagerEnter 0.4s
}

@keyframes viewPagerEnter{from{right:-300px;opacity:0} to{right:0;opacity:1}}

.view-pager-leave-active{
  position:relative;animation:viewPagerLeave 0.4s;
}

@keyframes viewPagerLeave{from{left:0;opacity:1} to{left:300px;opacity:0}}
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
