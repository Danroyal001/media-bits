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
          <EditorMenu v-else-if="$route.name === 'editor'" />
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
*{
  transition: 1.2s all;
}

::-webkit-scrollbar{
  width: 10px !important;
}

::-webkit-scrollbar-button{
  background-color: #008688 !important;
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
  position:relative;
  animation:viewPagerEnter 1.2s;
}
.view-pager-leave-active{
  position:relative;
  /* animation:viewPagerLeave 0.4s; */
  animation: viewPagerEnter reverse .6s;
}
@keyframes viewPagerEnter{
  from{
    right:-300px;
    perspective: 900;
    opacity:0;
    transform: translateZ(1000);
    -webkit-transform: translateZ(1);
    -moz-transform: translateZ(1);
    -ms-transform: translateZ(1);
    -o-transform: translateZ(1);
    }
  to{
    right:0;
    perspective: 1000;
    opacity:1;
    transform: translateZ(0);
    -webkit-transform: translateZ(1);
    -moz-transform: translateZ(1);
    -ms-transform: translateZ(1);
    -o-transform: translateZ(1);
    }
  }
/* @keyframes viewPagerLeave{
  from{left:0;opacity:1}
  to{left:300px;opacity:0}
  } */
  *{
    transition: all;
  }

  .bold{
    font-weight: 900;
  }
</style>

<script>
import EditorMenu from '@/components/EditorMenu.vue';
import * as M from '@/assets/js/materialize.min.js';

const workerString = `
postMessage("I'm working before postMessage('ali').");

onmessage = function(e) {
  postMessage('Hi ' + e.data);
};
`;

const workerBlob = new Blob([workerString], {
  type: 'application/javascript'
});

window.myWorker = new Worker(URL.createObjectURL(workerBlob));

const JSZip = require('jszip');
window.JSZip = JSZip;

window.M = M;

export default {
  name: 'App',
  mounted(){
    return window.M.AutoInit();
  },
  components: {
    EditorMenu
  }
}
</script>
