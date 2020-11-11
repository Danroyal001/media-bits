<template>
  <div oncontextmenu="return false" class="white" style="width: 100% !important; height:100% !important; margin: 0; padding: 0; overflow-x: hidden;">
  <div class="navbar-fixed">
    <nav class="teal">
      <div class="container">
        <div class="nav-wrapper">
          <a :href="window.isElectron === true ? 'javascript:window.electron.shell.openExternal(window.location.href)' : '#/'" class="brand-logo">
            <img src="@/assets/img/logo.png" style="height: 50px; padding-top: 21px; padding-left: 3px; padding-right: 3px;">
            <span class="hide-on-small-only">{{ $store.state.appName }}</span>
          </a>
          <a href="#sidenav" data-target="sidenav" class="sidenav-trigger"><i class="fas fa-bars"></i></a>
          <ul id="nav-mobile" class="right hide-on-med-and-down"  v-if="$route.name !== 'editor'">
            <li v-for="link in $store.state.primaryHyperlinks" :key="link.name"><router-link :to="link.href">{{ link.name }}</router-link></li>
            <li><a class="dropdown-trigger" href="#more-hyperlinks-dropdown" data-target="more-hyperlinks-dropdown">MORE<i></i></a></li>
          </ul>
          <EditorMenu v-else-if="($route.name === 'editor') && ($store.state.editorIsReady === true)" />
          <ul id="more-hyperlinks-dropdown" class="dropdown-content bold">
            <li><router-link to="/contact">Contact us</router-link></li>
            <li><router-link to="/documentation">Documentation</router-link></li>
          </ul>
          <UserViewOnDesktop />
          <MinMax v-if="window.isElectron" /> 
        </div>
      </div>
    </nav>
  </div>

  <!-- Begin Sidenav -->
  <ul class="sidenav" id="sidenav">
    <li v-for="link in $store.state.primaryHyperlinks" :key="link.name"><router-link :to="link.href" class="sidenav-close waves-effect waves-light">{{ link.name }}</router-link></li>
  </ul>
  <!-- End Sidenav -->
  
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

  <!-- Begin Global Loader Modal -->
<div id="global-loader-modal" class="modal">
    <div class="modal-content">
      <h4>Loading</h4>
      <span><PreLoader /></span>
    </div>
</div>
<!-- End Global Loader Modal -->

  </div>
</template>

<style src="@/assets/css/materialize.css"></style>

<style src="@/assets/css/fontawesome.min.css"></style>

<style>
*{
    /*transition: all 1.2s;*/
    scroll-behavior: smooth;
  }

/* Facilitate dragging behavior in eleectron */
.brand-logo{
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
.dropdown-content{
  width: 200px !important;
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
hr{
  border-top: thin solid #fff;
  border-bottom: thin solid #009688;
}
.position-absolute{
  position: absolute !important;
}
#global-loader-modal, #global-loader-modal *{
  overflow: hidden;
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
    /*perspective: 900;*/
    opacity:0;
    transform: translateZ(100px);
    -webkit-transform: translateZ(100px);
    -moz-transform: translateZ(100px);
    -ms-transform: translateZ(100px);
    -o-transform: translateZ(1);
    }
  to{
    right:0px;
    /*perspective: 1000;*/
    opacity:1;
    transform: translateZ(0px);
    -webkit-transform: translateZ(0px);
    -moz-transform: translateZ(0px);
    -ms-transform: translateZ(0px);
    -o-transform: translateZ(0px);
    }
  }
/* @keyframes viewPagerLeave{
  from{left:0;opacity:1}
  to{left:300px;opacity:0}
  } */
  .bold{
    font-weight: 900;
  }
  .m-y-4{
    margin-top: 4px;
    margin-bottom: 4px;
  }
</style>

<script>
import EditorMenu from '@/components/EditorMenu.vue';
import * as M from '@/assets/js/materialize.min.js';
import PreLoader from '@/components/PreLoader.vue';
import MinMax from '@/components/MinMax.vue';
import UserViewOnDesktop from "@/components/UserViewOnDesktop.vue";



// begin window.__workerFromString
window.__workerFromString = string => {
    const __myWorker = new Worker(URL.createObjectURL(new Blob([string], {
    type: 'application/javascript'
  })));
  return  __myWorker;
}
// end window.__workerFromString



window.JSZip = require('jszip');

window.M = M;

export default {
  name: 'App',
  mounted(){
    window.M.AutoInit();
    document.querySelector('#global-loader-modal').M_Modal.options.dismissible = false
  },
  components: {
    EditorMenu,
    PreLoader,
    MinMax,
    UserViewOnDesktop
  },
  data(){
    return {
      window
    }
  }
}
</script>
