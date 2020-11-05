<template>
<div class="editor-root">
<!-- Start Editor Root -->

<!-- Start Top Section -->
<div class="row top-section horizontal-scroll">
    <div class="horizontal-scroll-child" style="width: 100%; height: 100%; padding: 0px !important; margin: 0px !important; overflow: hidden !important;">
        <div class="col s12 m12 l6 x6 top-section-block">
            <div class="teal white-text top-section-header">PREVIEW</div>
            <canvas class="top-section-view black"></canvas>
        </div>
        <OutputDestination v-for="(output, index) in 1" :key="index" :id="output.id" :index="index" />
    </div>
</div>
<!-- End Top Section -->

<!-- Start Middle Section -->
<div class="teal middle-section row">
    <button v-for="btn in middleSectionBtns" :key="btn" @click="btn.action" class="btn-small waves-effect waves-light">{{ btn.label }}</button>
</div>
<!-- End Middle section -->

<div v-if="$store.state.inputSources.length > 0" class="horizontal-scroll black bottom-section">
    <InputSource v-for="(source, index) in $store.state.inputSources" :key="'input-source-' + (index + 1)" :source="source" :count="(index + 1)"></InputSource>
</div>
<EditorBottomNoInput v-else />

<!-- Begin Tools Modal -->
<div id="tools-modal" class="modal">
    <div class="modal-content">
      <h4>Tools <i class="fa fa-wrench"></i></h4>
      <!-- <select v-model="selectedMic" autofocus class="validate">
      <option v-for="mic in microphones" :key="mic" @change="selectedMic = mic" class="teal-text">{{ mic.label }}1</option>
      </select>
      <br />
      <p>Nothing showing? click on <code>GRANT PERMISSION</code></p> -->
    </div>
    <div class="modal-footer">
      <button class="btn-small red waves-effect waves-light modal-close">CLOSE</button>
    </div>
</div>
<!-- End Tools Modal -->

<!-- Begin select microphone modal -->
<div id="select-microphone-modal" class="modal">
    <div class="modal-content">
      <h4>Select Microphone <i class="fa fa-microphone"></i></h4>
      <select v-model="selectedMic" autofocus class="validate">
          <option v-for="mic in microphones" :key="mic" @change="selectedMic = mic" :value="mic.deviceId" class="teal-text">{{ mic.label }}1</option>
      </select>
      <br />
      <p>Nothing showing? click on <code>GRANT PERMISSION</code></p>
    </div>
    <div class="modal-footer">
      <button class="btn-small red waves-effect waves-light modal-close">CLOSE</button>
      <a @click="requestCameraPermission" class="modal-close waves-effect waves-light btn">GRANT PERMISSION</a>
      <a @click="addLiveAudio" class="modal-close waves-effect waves-green btn">Add</a>
    </div>
</div>
<!-- End select microphone modal -->

<!-- Begin select camera modal -->
<div id="select-camera-modal" class="modal">
    <div class="modal-content">
      <h4>Select Camera <i class="fa fa-camera"></i></h4>
      <select v-model="selectedCamera" autofocus class="validate">
          <option v-for="camera in cameras" :key="camera" @changed="selectedCamera = camera" :value="camera.deviceId" class="teal-text">{{ camera.label }}</option>
      </select>
      <br />
      <p>Nothing showing? click on <code>GRANT PERMISSION</code></p>
    </div>
    <div class="modal-footer">
      <button class="btn-small red waves-effect waves-light modal-close">CLOSE</button>
      <a @click="requestCameraPermission" class="modal-close waves-effect waves-light btn">GRANT PERMISSION</a>
      <a @click="addLiveVideo" class="modal-close waves-effect waves-green btn">Add</a>
    </div>
</div>
<!-- End select camera modal -->

<ElectronDesktopCaptureModal />

<!-- End Editor Root -->
</div>
</template>

<script>
import OutputDestination from '@/components/OutputDestination.vue';
import InputSource from '@/components/InputSource.vue';
import EditorBottomNoInput from '@/components/EditorBottomNoInput.vue';
import ElectronDesktopCaptureModal from '@/components/ElectronDesktopCaptureModal.vue';

export default {
    name: 'Editor',
    data(){
        return {
            middleSectionBtns: [],
            microphones: [],
            cameras: [],
            selectedCamera: {},
            selectedMic: {}
        };
    },
    mounted(){
        const _$this = this;
        //setInterval(() => {
           window.navigator.mediaDevices.enumerateDevices().then(devices => {
                _$this.cameras = [...devices.filter(device => device.kind === 'videoinput').map(i=>i)];
                _$this.microphones = [...devices.filter(device => device.kind === 'audioinput').map(i=>i)];
           });
        //}, 1000);
    },
    methods: {
        requestCameraPermission(){
            window/navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(stream => stream.getTracks().forEach(track => track.stop()));
        },
        addLiveAudio(){
            window.navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            }).then(stream => {
                window.$store.commit('addInputSource', {
                                name: 'Microphone',
                                id: Math.random(),
                                type: 'live audio input',
                                data: stream,
                                position: 0
                            })
            });
        },
        addLiveVideo(){
            window.navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    torch: true
                }
            }).then(stream => {
                window.$store.commit('addInputSource', {
                                name: 'Camera',
                                id: Math.random(),
                                type: 'live video input',
                                data: stream,
                                position: 0
                            })
            });
        }
    },
    components: {
        InputSource,
        OutputDestination,
        EditorBottomNoInput,
        ElectronDesktopCaptureModal
  },
}
</script>

<style>
.editor-root{
    width: 100% !important;
    /* height: calc(100% - 56px); */
    overflow: hidden;
    background-color: #434444;
}
.middle-section{
    width: 100% !important;
    margin: 0px;
    height: 35px !important;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}
.bottom-section{
    height: calc(50% - 37px);
    overflow-y: hidden;
}
.top-section{
    height: 100% !important;
    padding: 0px !important;
    margin: 0px !important;
    border-bottom: thin solid teal;
    border-top: thin solid teal;
    margin: 0px !important;
    padding: 0px !important;
}
.top-section > div{
    margin: 0px !important;
    padding: 0px !important;
    height: 100% !important;
    border-right: thin solid teal;
    border-left: thin solid teal;
}
.top-section-header{
    width: 100%;
    height: 17px;
    display: flex;
    align-items: center;
    margin: 0px;
    padding: 0px;
    justify-content: center;
    text-align: center;
    font-size: 13px;
}
.top-section-view{
    width: 100%;
    height: calc(100% - 18px);
}
.horizontal-scroll{
    white-space: nowrap;
    overflow-x: auto;
}
.horizontal-scroll-child{
    display: inline-block;
}
.top-section-block{
    padding: 0px !important;
    margin: 0px !important;
    height: 100%;
    border-right: thin solid teal;
    border-radius: 5px;
    overflow: hidden;
}

@media only screen and (min-width: 600px) and (max-width: 992px) {
/* Medium Screen */
    .editor-root{
        height: calc(100% - 64px);
    }
    .top-section{
        height: 40% !important;
    }
}

@media only screen and (min-width: 993px) {
/* Large Screen */
    .editor-root{
        height: calc(100% - 64px);
    }
    .top-section{
        height: 50% !important;
    }
}
</style>