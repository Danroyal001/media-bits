<template>
<div class="root">
<div class="audio green-audio-player">
  <div class="loading">
    <div class="spinner"></div>
  </div>
  <div class="play-pause-btn">  
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24">
      <path fill="#566574" fill-rule="evenodd" d="M18 12L0 24V0" class="play-pause-icon" id="playPause"/>
    </svg>
  </div>
  
  <div class="controls">
    <span class="current-time">0:00</span>
    <div class="slider" data-direction="horizontal">
      <div class="progress">
        <div class="pin" id="progress-pin" data-method="rewind"></div>
      </div>
    </div>
    <span class="total-time">0:00</span>
  </div>
  
  <div class="volume">
    <div class="volume-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="#566574" fill-rule="evenodd" d="M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z" id="speaker"/>
      </svg>
    </div>
    <div class="volume-controls hidden">
      <div class="slider" data-direction="vertical">
        <div class="progress">
          <div class="pin" id="volume-pin" data-method="changeVolume"></div>
        </div>
      </div>
    </div>
  </div>
  
  <audio id="preview" crossorigin loop></audio>
    <!-- <source src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/equalizer.mp3" type="audio/mpeg"> -->
</div>

<div class="equalizer">
  <div class="section">
    <div class="title">HF</div>
    <div class="sliders">
      <div class="range-slider">
        <span class="scope">22</span>
        <input type="range" class="vertical" min="4700" max="22000" step="100" value="4700" data-filter="highShelf" data-param="frequency">
        <span class="scope scope-min">4.7</span>
        <span class="param">kHz</span>  
      </div>
      <div class="range-slider">
        <span class="scope">50</span>
        <input type="range" class="vertical" min="-50" max="50" value="50" data-filter="highShelf" data-param="gain">
        <span class="scope scope-min">-50</span>
        <span class="param">dB</span>  
      </div>
    </div>
  </div>
    
  <div class="section">
    <div class="title">LF</div>
    <div class="sliders">
      <div class="range-slider">
        <span class="scope">220</span>
        <input type="range" class="vertical" min="35" max="220" step="1" value="35" data-filter="lowShelf" data-param="frequency">
        <span class="scope scope-min">35</span>
        <span class="param">Hz</span>  
      </div>
      <div class="range-slider">
        <span class="scope">50</span>
        <input type="range" class="vertical" min="-50" max="50" value="50" data-filter="lowShelf" data-param="gain">
        <span class="scope scope-min">-50</span>
        <span class="param">dB</span>  
      </div>
    </div>
  </div>
      
  <div class="section">
    <div class="title">HMF</div>
    <div class="sliders">
      <div class="range-slider">
        <span class="scope">5.9</span>
        <input type="range" class="vertical" min="800" max="5900" step="100" value="800" data-filter="highPass" data-param="frequency">
        <span class="scope scope-min">0.8</span>
        <span class="param">kHz</span>  
      </div>
      <div class="range-slider">
        <span class="scope">12</span>
        <input type="range" class="vertical" min="0.7" max="12" step="0.1" value="0.7" data-filter="highPass" data-param="Q">
        <span class="scope scope-min">0.7</span>
        <span class="param">Q</span>  
      </div>
    </div>
  </div>  
    
  <div class="section">
    <div class="title">LMF</div>
    <div class="sliders">
      <div class="range-slider">
        <span class="scope">1600</span>
        <input type="range" class="vertical" min="80" max="1600" step="10" value="880" data-filter="lowPass" data-param="frequency">
        <span class="scope scope-min">80</span>
        <span class="param">Hz</span>  
      </div>
      <div class="range-slider">
        <span class="scope">12</span>
        <input type="range" class="vertical" min="0.7" max="12" step="0.1" value="0.7" data-filter="lowPass" data-param="Q">
        <span class="scope scope-min">0.7</span>
        <span class="param">Q</span>  
      </div>
    </div>
  </div>
  
</div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "audio-equalizer",
    mounted(){}
})
</script>

<style scoped>

</style>