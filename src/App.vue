<template>
  <div oncontextmenu="return false" ondrag="return false" ondragstart="return false" ondragover="return false" class="white" style="width: 100% !important; height:100% !important; margin: 0; padding: 0; overflow-x: hidden;">
  <div class="navbar-fixed">
    <nav class="teal">
      <div class="container">
        <div class="nav-wrapper">
          <a :href="window.isElectron === true ? 'javascript:void(0)' : `javascript:(() => window.$router.push('/'))()`" class="brand-logo">
            <img src="@/assets/img/logo.png" style="height: 50px; padding-top: 21px; padding-left: 3px; padding-right: 3px;">
            <span class="hide-on-small-only">{{ $store.state.appName }}</span>
          </a>
          <a href="#sidenav" data-target="sidenav" class="sidenav-trigger"><i class="fas fa-bars"></i></a>
          <ul id="nav-mobile" class="right hide-on-med-and-down"  v-if="$route.name !== 'editor'">
            <!--<li>
              <div class="user-view" style="height: 300px; width: 300px;">
                <div class="background">
                  <img style="width: 300px; height: 300px;" src="@/assets/img/office.jpg">  
                </div>
                <a href="#user"><img class="circle" style="height: 100px; width: 100px;" src="@/assets/img/user-circle.svg"></a>
                <a href="#name"><span class="white-text name">John Doe</span></a>
                <a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
              </div>
            </li>-->
            <li v-for="link in $store.state.primaryHyperlinks" :key="link.name"><router-link :to="link.href">{{ link.name }}</router-link></li>
            <li><a class="dropdown-trigger" href="#more-hyperlinks-dropdown" data-target="more-hyperlinks-dropdown">MORE &nbsp; <small><sub><i class="fas fa-caret-down"></i></sub></small></a></li>
          </ul>
          <EditorMenu v-else-if="($route.name === 'editor') && ($store.state.editorIsReady === true)" />
          <more-hyperlinks-dropdown-on-homepage v-if="$route.name !== 'editor'" />
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
      <h4>{{ $store.state.globalLoaderText }}</h4>
      <span><PreLoader /></span>
    </div>
</div>
<!-- End Global Loader Modal -->

  <AuthenticationModal />

  </div>
</template>

<!-- <style src="@/assets/css/materialize.css"></style> -->

<!-- <style src="@/assets/css/fontawesome.min.css"></style> -->

<style>
*{
    /*transition: all 1.2s;*/
    scroll-behavior: smooth;
  }

.modal-overlay{
  cursor: not-allowed !important;
  pointer-events: none !important;
}

.btn, .btn-small{
  padding-left: 5px !important;
  padding-right: 5px !important;
  margin-left: 5px !important;
  margin-right: 5px !important;
}

/* Facilitate dragging behavior in eleectron */
.brand-logo{
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
.disabled, [disabled]{
  opacity: 0.5;
  pointer-events: none;
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
  border-radius: 100px;
  background: #008688;
  box-sizing: border-box;
  border: 2px solid #ffffff;
  animation-name: scrollbarThumbAnimation !important;
  animation-duration: 1s;
  animation-delay: 1s;
}

@keyframes scrollbarThumbAnimation{
  0%{
    background: #434a5f !important
    }
  50%{
    background: #033131  !important;
  }
  100%{
    background: #434a5f !important;
  }
}

@-webkit-keyframes scrollbarThumbAnimation{
  0%{
    background: #434a5f !important
    }
  50%{
    background: #033131  !important;
  }
  100%{
    background: #434a5f !important;
  }
}

::-webkit-scrollbar-track{
  background: transparent;
  border: none;
  /*background: #000000;
  border: thin solid #ffffff;*/
}
hr{
  border-top: thin solid #fff;
  border-bottom: thin solid #434a5f;
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

.p-8px{
  padding: 8px;
}

.view-pager-enter-active{
  position:relative;
  animation:viewPagerEnter 1.2s;
}
.view-pager-leave-active{
  position:relative;
  /* animation:viewPagerLeave 0.4s; */
  animation: viewPagerEnter reverse 1.2s;
}
@keyframes viewPagerEnter{
  from{
    bottom: -300px;
    /*perspective: 900;*/
    opacity: 0;
    transform: translateZ(100px);
    -webkit-transform: translateZ(100px);
    -moz-transform: translateZ(100px);
    -ms-transform: translateZ(100px);
    -o-transform: translateZ(1);
    }
  to{
    bottom: 0px;
    /*perspective: 1000;*/
    opacity: 1;
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

  .m-y-4px{
    margin-top: 4px;
    margin-bottom: 4px;
  }
</style>

<script lang="ts">
import EditorMenu from "@/components/EditorMenu.vue";
// import * as M from "@/assets/js/materialize.min.js";
// window.M = M;
import "@/assets/js/materialize.min.js";
import PreLoader from "@/components/PreLoader.vue";
import MinMax from "@/components/MinMax.vue";
import UserViewOnDesktop from "@/components/UserViewOnDesktop.vue";
import AuthenticationModal from "@/components/AuthenticationModal.vue";
import MoreHyperlinksDropdownOnHomepage from "@/components/MoreHyperlinksDropdownOnHomepage.vue";

import { defineComponent } from "vue";


// stylesheets
import "@/assets/css/materialize.css";
import "@/assets/css/fontawesome.min.css";

(window as any).JSZip = require("jszip");

const __VideoContextToString: string = `function __VideoContext(options) { [native code] }` as string;

class __VideoContext {
  maxNodeCount: number;
  sampleRate: number;
  id: number;
  state: string;
  canvas: HTMLCanvasElement|any;
  ctx: CanvasRenderingContext2D | null;
  startTime: number;
  destination: HTMLVideoElement;
  destinations: HTMLVideoElement[];
  shouldTerminate: boolean;
  onstatechange: (newState: string) => string;
  sourceNodes: HTMLMediaElement[]|HTMLVideoElement[]|null[];
  sourceNodeSettings: any[];
  
  constructor() {
    this.maxNodeCount = 6;

    this.sampleRate = 60;

    this.id = Math.random()

    // this.state = "suspended";
    this.state = "running";

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.startTime = Date.now();

    this.destination = document.createElement('video');
    // eslint-disable-next-line no-prototype-builtins
    this.destination.srcObject = (this.canvas as any).captureStream!!(this.sampleRate) as MediaStream
    this.destination.muted = true;

    this.destinations = [this.destination]

    this.shouldTerminate = false;

    this.onstatechange = newState => {
      return `New state: ${newState}`;
    };

    this.sourceNodes = []
    this.sourceNodes.length = this.maxNodeCount;

    this.sourceNodeSettings = [];

    const renderFrame = () => {

      const frameId = setTimeout(renderFrame, 1000/60);

      if (this.shouldTerminate){

        return clearTimeout(frameId);

      }

      if ((this.state == "running") && (this.sourceNodes.length > 0)){

        const fn = (node: HTMLMediaElement) => {
          this.ctx?.drawImage((node as CanvasImageSource), 0, 0);
        }

        // draw image here
        this.sourceNodes.forEach((fn as unknown as ((value: HTMLMediaElement, index: number, array: HTMLMediaElement[]) => void) & ((value: null, index: number, array: null[]) => void)))

      }

        console.log(`renderFrame`);
    }

    renderFrame();

    return this;
  }

  createMediaStreamSource(mediaStream: MediaStream) {
    const elem = document.createElement('video');
    elem.muted = true;
    elem.srcObject = mediaStream;
    this.sourceNodes.push(elem as never)
    return this;
  }

  createMediaElementSource(mediaElement: HTMLMediaElement) {
    this.sourceNodes.push(mediaElement as never)
    return this;
  }

  createMediaStreamDestination() {
    return new MediaStream(
      (this.canvas as any).captureStream!!(this.sampleRate)?.getTracks()
    );
  }

  createMediaElementDestination(){
    const stream = new MediaStream(this.canvas.captureStream(this.sampleRate).getTracks());

    const elem = document.createElement('video');
    elem.srcObject = stream;

    return elem;
  }

  get currentTimeInMills() {
    return Date.now() - this.startTime;
  }

  suspend() {
    this.state = "suspended";
    this.onstatechange(this.state);
    return "suspended";
  }

  resume() {
    this.state = "running";
    this.onstatechange(this.state);
    return "running";
  }

  setBWFilter(){}

  setSephiaFilter(){}

  setBlurFilter(){}

  setEffect(){}

  setEntryEffect(){}

  setAfterEffect(){}

  close() {
    this.suspend();
    this.shouldTerminate = true;

    return null;
  }

  static toString() {
    return __VideoContextToString;
  }
}

__VideoContext.prototype.toString = () => {
    return __VideoContextToString;
  }

Object.defineProperty(window, '__VideoContext', {
  value: __VideoContext as typeof __VideoContext,
  writable: false,
  configurable: false,
  enumerable: true
  });

// begin window.__workerFromString
(window as any).__workerFromString = (str: string) => {
  const __myWorker = new Worker(
    URL.createObjectURL(
      new Blob([str], {
        type: "application/javascript"
      })
    )
  );
  return __myWorker;
};
// end window.__workerFromString

export default defineComponent({
  name: "App",
  mounted() {
    window.addEventListener('keyup', e => {
      if (((e.key === 'q') || (e.key === 'Q')) && e.ctrlKey){
        if ((window as any).isElectron) (window as any).electron.app.quit();
      }
    });

    return window.M.AutoInit();
  },
  components: {
    EditorMenu,
    PreLoader,
    MinMax,
    UserViewOnDesktop,
    AuthenticationModal,
    MoreHyperlinksDropdownOnHomepage
  },
  data() {
    return {
      window
    };
  }
});

</script>
