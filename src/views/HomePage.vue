<template>
<div class='home-page-root'>
<!-- Root -->

<!-- Begin carousel -->
  <div class="carousel carousel-slider center black-text">

    <div class="carousel-fixed-item center">
      <router-link to="/editor" class="btn waves-effect waves-light teal white-text pulse">GET STARTED</router-link>
    </div>

    <div v-for="x in 4" :key="x" :id="'homepage-carousel-item-' + x" class="carousel-item">
      <img src="@/assets/img/1.png">
    </div>
    
  </div>
  <!-- End Carousel -->
  
  <!-- after carousel -->
  <div class="teal">
    <br />
    <div class="container center">
      <router-link to="/pricing" class="m-y-4px btn white black-text bold waves-effect waves-teal">Pricing</router-link> &nbsp;
      <a @click="viewFeatures" class="m-y-4px btn white black-text bold waves-effect waves-teal">View Features</a> &nbsp;
      <router-link to="/demo-video" class="m-y-4px btn white black-text bold waves-effect waves-teal">Watch demo video</router-link> &nbsp;    
    </div>
    <br />
  </div>
  <!-- end after carousel -->

  <div class="row white-text">
    <div class="col s12 m6 l4 grid-after-carousel center centered teal">
      <br />
      <span>Propriety Software - Daniel Effiong</span>
      <br />
      <br />
      <a href="https://daniel-effiong.web.app" class="btn waves-effect wave-light white teal-text bold">Find out more</a>
      <br />
      <br />
    </div>
    <div class="col s12 m6 l4 grid-after-carousel center centered teal">
      <br />
      <span>Version 1.0 is out</span>
      <br />
      <br />
      <router-link to="/download" class="btn waves-effect wave-light white teal-text bold">Download / view version history</router-link>
      <br />
      <br />
    </div>
    <div class="col s12 m12 l4 grid-after-carousel center centered teal">
      <br />
      <span>Watch tutorial videos</span>
      <br />
      <br />
      <a href="https://daniel-effiong.web.app" class="btn waves-effect wave-light white teal-text bold">Watch now</a>
      <br />
      <br />
    </div>
  </div>

  <div class="center">
    <h2> <img src="@/assets/img/logo.png" height="50" alt="Media-Bits Logo"> {{ $store.state.appName }}</h2>
  </div>

  <div class="container">
    <h5 class="center">Next generation multimedia streaming, editing, switching, mixing, projection and <wbr />video-conferencing<wbr /> software</h5>
    <br />
    <p>{{ $store.state.appName }} is a live multimedia streaming, editing, switching, mixing, projection and <wbr />video-conferencing<wbr /> software that utilises the latest advances in computer software and hardware to provide advanced multimedia capabilities, a task previously only possible on expensive dedicated hardware.</p>
    <p>{{ $store.state.appName }} also functions as live streaming software that allows you to publish your live productions directly to the Internet!.</p>
    <p>{{ $store.state.appName }} runs on Windows 7, Windows 8, Windows 10, Linux, Mac OSX and in the Browser.</p>
    <p>{{ $store.state.appName }} is a complete live video production software solution with features including <b>LIVE</b> mixing, switching, recording and streaming of SD, full HD and 4K video sources including cameras, video files, DVDs, images, verses Powerpoint and much much more.</p>
    <p>Whether you are looking to produce big budget live concert productions, sporting events, Church services or small webcasts, then {{ $store.state.appName }} is for you.</p>
    <p>For a full list of what is possible with {{ $store.state.appName }}, <a @click="viewFeatures" href="javascript:void(0)">click here</a> to view all features.</p>
    <p><b>Download a trial today and use a fully functional version of {{ $store.state.appName }} for 14 days free of charge.</b></p>
  </div>
  <br />
  <div class="center">
    <router-link to="/download" class="btn teal waves-effect waves-light">DOWNLOAD</router-link>
    <br />
    OR
    <br />
    <router-link  to="/editor" class="btn teal waves-effect waves-light">Get started directly in your browser</router-link>
  </div>

  <br />
  <br />
  <br />

  <div id="features" class="teal white-text">
    <br />
    <br />
    <h3 class="center">Welcome to a world of possibilities!</h3>
    <br />
    <div class="center"><span style="font-size: 30px; padding: 10px; maring-top: 16px;" class="center white teal-text bold">{{ $store.state.appName }} Features</span></div>
    <br />
    <br />
    <div class="row white-text">
      <div class="col s12 m6 l4 center">
        <div><img src="@/assets/img/logo.png" width="100"></div>
        <h5>Video/Audio Streaming</h5>
        <p>{{ $store.state.appName }} is capable of streaming HD video and audio from varying input sources to remote output destinations</p>
      </div>

      <div class="col s12 m6 l4 center">
        <div><img src="@/assets/img/logo.png" width="100"></div>
        <h5>Video/Audio Editing</h5>
        <p>{{ $store.state.appName }} is a handy tool for quick video/audio editing and trimming</p>
      </div>

      <div class="col s12 m12 l4 center">
        <div><img src="@/assets/img/logo.png" width="100"></div>
        <h5>Audio Extraction</h5>
        <p>{{ $store.state.appName }} proves itself very useful when it comes <br />to extracting audio tracks from a video</p>
      </div>
    </div>
    <br />
    <div class="row white-text">
      <div class="col s12 m6 l4 center">
        <div><img src="@/assets/img/logo.png" width="100"></div>
        <h5>Video/Audio format conversion</h5>
        <p>{{ $store.state.appName }} is a formindable video/audio file format <br />converter. Whether it's from webm to mp4 or wav to mp3, {{ $store.state.appName }} has you covered</p>
      </div>

      <div class="col s12 m6 l4 center">
        <div><img src="@/assets/img/logo.png" width="100"></div>
        <h5>Video Projection</h5>
        <p>{{ $store.state.appName }} can project video output to wired and wireless secondary monitors/display</p>
      </div>

      <div class="col s12 m12 l4 center">
        <div><img src="@/assets/img/logo.png" width="100"></div>
        <h5>Noise filtering</h5>
        <p>{{ $store.state.appName }} also proves to be a handy tool for <br />echo-cancellation and extraction of background noise from video and audio</p>
      </div>
    </div>
    <br />
    <div class="row white-text">
      <div class="col s12 m6 l6 center">
        <div><img src="@/assets/img/logo.png" width="100"></div>
        <h5>Video conferencing</h5>
        <p>Video Conferencing is made super-easy with <br />{{ $store.state.appName }}</p>
      </div>

      <div class="col s12 m6 l6 center">
        <div><img src="@/assets/img/logo.png" width="100"></div>
        <h5>Project Collaboration</h5>
        <p>{{ $store.state.appName }} acknowledges the fact that we live in <br />the cloud computing era. For this reason, <br />{{ $store.state.appName }} makes it project collaboration possible</p>  
      </div>
    </div>
    <br />
  </div>

  <br />
  <br />
  <br />
  <div class="center">
    <a :target="window.isElectron ? false : '_blank'" :href="window.isElectron ? 'javascript:window.electron.shell.openExternal(\'https://daniel-effiong.web.app/#/projects\')' : 'https://daniel-effiong.web.app/#/projects'" class="btn teal waves-efect waves-light center">SEE MORE SOFTWARES FROM  DANIEL EFFIONG</a>
  </div>
  <br />
  <br />
  <br />

  <br />
  <br />

  <div class="container">
    <h3 class="center">Latest News</h3>
    <!-- Begin Latest News carousel -->
    <div class="carousel carousel-slider center black-text">
      <div v-for="x in 4" :key="x" :id="'latest-news-carousel-item-' + x" class="carousel-item teal">
        <img src="@/assets/img/1.png">
      </div>
    </div>
    <!-- End Latest News Carousel -->
  </div>

  <br />
  <br />
  <br />

  <div class="container row before-footer">
    <form @submit="subscribeToNewsLetter($event)" class="col s12 m6 l6">
      <span>Subscribe to {{ $store.state.appName }} newsletter</span>
      <br />
      <input type="email" pattern="\S+@\S+.\S+" placeholder="john@doe.com" required>
    </form>

    <div class="col s12 m6 l6">
      <span>{{ $store.state.appName }} Blog</span>
      <br />
      <router-link to="/blog" class="btn teal waves-effect waves-light">Visit our blog for more news</router-link>
    </div>
  </div>

  <br />

<FooterComponent />

<!-- End Root -->
</div>
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: 'HomePage',
  methods: {
    logData($event){
      console.log($event);
    },
    viewFeatures(){
      return document.querySelector('#features').scrollIntoView(true)
    },
    subscribeToNewsLetter($event){
      $event.preventDefault();
    }
  },
  components: {
    FooterComponent
  },
  data(){
    return {
      carouselInstance: {},
      window,
      year: `${(new Date()).getFullYear()}`
    }
  },
  created(){
    // this.carouselInstance = M.Carousel.getInstance(document.querySelector('.carousel'));
    // setInterval(() => this.carouselInstance.next(), 3000)
  },
  mounted(){

    const fn = () => {
      var elems = document.querySelectorAll('.carousel');
     this.carouselInstance = window.M.Carousel.init(elems, {
       fullWidth:true,
       indicators:true,
       dist: -100,
      //  numVisible: 3
     });
    }

    fn();

    window.addEventListener('resize', fn);

     setInterval(() => this.carouselInstance[0].next(), 5000);
  }
}
</script>

<style>
.grid-after-carousel{
  border: thin solid white;
}
.before-footer{
  margin-bottom: 16px;
}
.before-footer span{
  font-size: 30px;
  font-weight: 900;
}
.before-footer input[type=email]{
  caret-color: #009688;
  color: #009688;
}
#features .row .col{
  margin-top: 16px;
  margin-bottom: 26px;
}
</style>