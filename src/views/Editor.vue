<template>
<div class="editor-root black">
<!-- Start Editor Root -->

<!-- Start Top Section -->
<div class="top-section horizontal-scroll">
    
    <div class="horizontal-scroll-child horizontal-scroll-child-1 white-text">
        <div v-if="$store.state.inputSources[$store.state.focusedInputSource]" class="black white-text fill" style="display: block !important; overflow: hidden;">
            <div style="width: 100%; height: 20px; font-size: 15px;" class="center bold white-text teal">Preview</div>

            <video id="preview" muted nocontrols loop autoplay v-if="($store.state.inputSources[$store.state.focusedInputSource]) && ($store.state.inputSources[$store.state.focusedInputSource].type.toLowerCase().includes('video'))" style="width: 100%; height: calc(100% - 20px);"></video>

            <AudioEqualizer id="preview" loop autoplay v-else-if="($store.state.inputSources[$store.state.focusedInputSource]) && ($store.state.inputSources[$store.state.focusedInputSource].type.toLowerCase().includes('audio'))" controls></AudioEqualizer>

            <img id="preview" v-else-if="($store.state.inputSources[$store.state.focusedInputSource]) && ($store.state.inputSources[$store.state.focusedInputSource].type.toLowerCase().includes('image'))" style="width: 100%; height: calc(100% - 20px);" />
        </div>
        <div v-else class="black white-text fill" style="display: block !important; overflow: hidden;">
            <div style="width: 100%; height: 20px; font-size: 15px;" class="center bold white-text teal">Preview</div>
        </div>
    </div>
    <div class="horizontal-scroll-child horizontal-scroll-child-2 teal">
        <div style="width: 100%; height: 20px; font-size: 15px;" class="center bold white-text teal">Output</div>
        <div v-for="(x, _index) in 1" :key="'output-destination-' + _index" :id="'output-destination-' + (_index + 1)" class="black white-text output-destination row" style="display: block; margin: 0px; padding: 0px; width: 100%; height: calc(100% - 20px);">
            <div class="col s12 row output-destination-top-block">
                <div class="col s1 orange output-audio-channel-visualizer row">
                    <div class="col s2">&nbsp;</div>

                    <div class="col s3 teal">
                        <div>
                            <div style="height: 50%;" class="output-audio-channel-progress-bar left-channel teal" />
                        </div>
                        <span>L</span>
                    </div>

                    <div class="col s2">
                        &nbsp;
                    </div>

                    <div class="col s3 teal">
                        <div>
                            <div style="htight: 59%;" class="output-audio-channel-progress-bar right-channel teal" />
                        </div>
                        <span>R</span>
                    </div>

                    <div class="col s2">&nbsp;</div>
                </div>
                <video class="col s11 output-video-visualizer" autoplay="true" nocontrols loop></video>
            </div>
            <div class="col s12 orange output-destination-bottom-block">
                <button @click="project($event, (_index + 1))" :class="['btn-small', $store.state.isProjecting ? 'red' : 'teal', 'white-text', 'waves-effect', 'waves-light', 'bold']"> {{ $store.state.isProjecting ? 'PROJECTING' : 'PROJECT' }} <i class="fa fa-desktop"></i></button>

                <button class="btn-small teal white-text waves-effect waves-light bold">STREAM <i class="fa fa-wifi"></i></button>

                <button @click="toggleRecord($event, (_index + 1))" :class="['btn-small', $store.state.isRecording ? 'red' : 'teal', 'white-text', 'waves-effect', 'waves-light', 'bold']"> {{ $store.state.isRecording ? 'RECORDING' : 'RECORD' }} <i class="fa fa-video"></i></button>
  
                <button class="btn-small teal white-text waves-effect waves-light bold">CONFIG <i class="fa fa-wrench"></i></button>
            </div>
        </div>
    </div>
</div>
<!-- End Top Section -->

<!-- Begin Middle Section -->
<div class="teal middle-section white-text">
    <div class="input-field">
      <select class="white-text">
        <option
        v-for="item in [
          {
            label: 'Slide from Bottom',
            value: 'slide-form-bottom'
          },
          {
            label: 'Slide from Top',
            value: 'slide-from-top'
          },
          {
            label: 'Slide from Left',
            value: 'slide-from-left'
          },
          {
            label: 'Slide from Right',
            value: 'slide-from-right'
          },
          {
            label: 'Fade',
            value: 'fade'
          },
          {
            label: 'Scale in',
            value: 'scale-in'
          },
          {
            label: 'Scale out',
            value: 'scale-out'
          },
          {
            label: '3D Rotate to left',
            value: '3d-rotate-to-left'
          },
          {
            label: '3D Rotate to right',
            value: '3d-rotate-to-right'
          },
          {
            label: '3D Rotate to top',
            value: '3d-rotate-to-top'
          },
          {
            label: '3D Rotate to bottom',
            value: '3d-rotate-to-bottom'
          },
          {
            label: 'Spin-in clockwise',
            value: 'spin-in-clockwise'
          },
          {
            label: 'Spin-in counter-clockwise',
            value: 'spin-in-counter-clockwise'
          },
          {
            label: 'Get more Transitions',
            value: 'get-more'
          }
        ]"
        class="white-text"
        :key="JSON.stringify(item)"
        :id="JSON.stringify(item)"
        :value="item.value"
        >{{ item.value === 'get-more' ? '' : 'Transition:' }} {{ item.label }}</option>
      </select>
    </div>

    <div id="switch-preview-and-output-slider" class="white teal-text input-field">
      <small>Preview</small>
      <input
      type="range"
      value="0"
      min="0"
      max="100"
      step="0.01"
      :disabled="true"
      />
      <small>Live</small>
    </div>

    <div class="input-field">
      <a href="#view-recordings-modal" class="modal-trigger teal btn-small waves-effect waves-light waves-white">View Recordings</a>
    </div>
</div>
<!-- End Middle section -->

<!-- Begin bottom section -->
<div @drop="onDrop($event)" v-if="$store.state.inputSources.length > 0" class="dragover horizontal-scroll black bottom-section">
    <InputSource v-for="(source, index) in $store.state.inputSources" :key="'input-source-' + (index + 1)" :source="source" :count="(index + 1)"></InputSource>
</div>
<EditorBottomNoInput class="dragover" @drop="onDrop($event)" v-else />
<!-- end bottom section -->

<!-- Begin Tools Modal -->
<div id="tools-modal" class="modal">
    <div class="modal-content">
      <h4>Tools <i class="fa fa-wrench"></i></h4>
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
      <form>
          <p v-for="mic in microphones" :key="mic.label">
            <label>
              <input v-model="selectedMic" :value="mic.deviceId + '--' + mic.label" class="with-gap" name="camera" type="radio" />
              <span class="teal-text">{{ mic.label }}</span>
            </label>
          </p>
      </form>
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

<!-- Begin view recordings modal -->
<div id="view-recordings-modal" class="modal">
    <div class="modal-content black-text">
      <h4>Recordings <i class="fa fa-video"></i></h4>
      
      <ul v-if="!$store.state.length">
        <li>Oops! no recordings</li>
      </ul>

      <ul v-else>
        <li
        v-for="(record, index) in $store.state.recordings"
        :key="index + Math.random()"
        >{{ record.name }}</li>
      </ul>

    </div>
    <div class="modal-footer">
      <button class="btn-small red waves-effect waves-light modal-close">CLOSE</button>
    </div>
</div>
<!-- End view recordings modal -->

<!-- Begin image from url modal -->
<div id="image-from-url-modal" class="modal">
    <div class="modal-content">
      <h4>Type the image URL below <i class="fa fa-globe"></i></h4>
      <form>
          <input placeholder="type url here" type="url" />
      </form>
      <br />
    </div>
    <div class="modal-footer">
      <button class="btn-small red waves-effect waves-light modal-close">CLOSE</button>
      <a class="modal-close waves-effect waves-green btn">Add</a>
    </div>
</div>
<!-- End image from url modal -->

<!-- Begin video from url modal -->
<div id="video-from-url-modal" class="modal">
    <div class="modal-content">
      <h4>Type the video URL below <i class="fa fa-globe"></i></h4>
      <form>
          <input placeholder="type url here" type="url" />
      </form>
      <br />
    </div>
    <div class="modal-footer">
      <button class="btn-small red waves-effect waves-light modal-close">CLOSE</button>
      <a class="modal-close waves-effect waves-green btn">Add</a>
    </div>
</div>
<!-- End video from url modal -->

<!-- Begin url modal -->
<div id="url-modal" class="modal">
    <div class="modal-content">
      <h4>Type the URL below <i class="fa fa-globe"></i></h4>
      <form>
          <input placeholder="type url here" type="url" />
      </form>
      <br />
    </div>
    <div class="modal-footer">
      <button class="btn-small red waves-effect waves-light modal-close">CLOSE</button>
      <a class="modal-close waves-effect waves-green btn">Add</a>
    </div>
</div>
<!-- Endurl modal -->

<!-- Begin audio from url modal -->
<div id="audio-from-url-modal" class="modal">
    <div class="modal-content">
      <h4>Type the audio URL below <i class="fa fa-globe"></i></h4>
      <form>
          <input placeholder="type url here" type="url" />
      </form>
      <br />
    </div>
    <div class="modal-footer">
      <button class="btn-small red waves-effect waves-light modal-close">CLOSE</button>
      <a class="modal-close waves-effect waves-green btn">Add</a>
    </div>
</div>
<!-- End audio from url modal -->

<!-- Begin select camera modal -->
<div id="select-camera-modal" class="modal">
    <div class="modal-content">
      <h4>Select Camera <i class="fa fa-camera"></i></h4>
      <form>
          <p v-for="camera in cameras" :key="camera.label">
            <label>
              <input v-model="selectedCamera" :value="camera.deviceId + '--' + camera.label" class="with-gap" name="camera" type="radio" />
              <span class="teal-text">{{ camera.label }}</span>
            </label>
          </p>
      </form>

      <br />
      <p>Nothing showing? click on <code>GRANT PERMISSION</code></p>
    </div>
    <div class="modal-footer">
      <button class="btn-small red waves-effect waves-light modal-close">CLOSE</button>
      <a @click="requestCameraPermission" class="modal-close waves-effect waves-light btn">GRANT PERMISSION</a>
      <a @click="addLiveVideo" class="modal-close waves-effect waves-light btn">Add</a>
    </div>
</div>
<!-- End select camera modal -->

<ElectronDesktopCaptureModal />

<!-- End Editor Root -->
</div>
</template>

<script>
// import OutputDestination from '@/components/OutputDestination.vue';
import InputSource from "@/components/InputSource.vue";
import EditorBottomNoInput from "@/components/EditorBottomNoInput.vue";
import ElectronDesktopCaptureModal from "@/components/ElectronDesktopCaptureModal.vue";
import AudioEqualizer from "@/components/AudioEqualizer.vue";

export default {
  name: "Editor",
  data() {
    return {
      microphones: [],
      cameras: [],
      selectedCamera: '',
      selectedMic: '',
      hasGottenDevices: false
    };
  },
  mounted() {
    const _$this = this;

    this.$store.commit("editorIsReady");
    //setInterval(() => {
    window.navigator.mediaDevices.enumerateDevices().then(devices => {
      _$this.cameras = [
        ...devices.filter(device => device.kind === "videoinput").map(i => i)
      ];
      _$this.microphones = [
        ...devices.filter(device => device.kind === "audioinput").map(i => i)
      ];
      _$this.hasGottenDevices = true;
      window.M.AutoInit();
    });
    //}, 1000);
  },
  methods: {
    requestCameraPermission() {
      window.navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(stream => stream.getTracks().forEach(track => track.stop()));
    },
    addLiveAudio() {
      if (this.selectedMic !== ''){

      const label = this.selectedMic.split('--')[1];
      const deviceId = this.selectedMic.split('--')[0];

      window.navigator.mediaDevices
        .getUserMedia({
          deviceId: deviceId,
          label: label,
          audio: true,
          video: false
        })
        .then(stream => {
          window.$store.commit("addInputSource", {
            name: `Microphone - ${label}`,
            id: Math.random(),
            type: "live audio input",
            data: stream,
            position: 0
          });
        });
    
      } else return window.M.toast({
          html: "Please select one microphone to proceed",
          classes: "red pulse bold rounded"
        });
    },
    addLiveVideo() {
      if (this.selectedCamera) {

      const label = this.selectedCamera.split('--')[1];
      const deviceId = this.selectedCamera.split('--')[0];

      window.navigator.mediaDevices
        .getUserMedia({
          label: label,
          deviceId: deviceId,
          audio: false,
          video: {
            torch: true
          }
        })
        .then(stream => {
          window.$store.commit("addInputSource", {
            name: `Camera - ${label}`,
            id: Math.random(),
            type: "live video input",
            data: stream,
            position: 0
          });
        });
    
      } else return window.M.toast({
          html: "Please select one camera to proceed",
          classes: "red pulse bold rounded"
        });
    },
    project($event, outputDestinationNumber) {
      if (
        document.querySelector(
          `#output-destination-${outputDestinationNumber} video`
        ).srcObject
      ) {
        const $this = this;
        if (window.secondaryMonitor !== undefined) {
          try {
            window.secondaryMonitor.close();
            window.secondaryMonitor = undefined;
          } catch (e) {
            window.secondaryMonitor = undefined;
          }
          $this.$store.commit("setIsProjecting", false);
        } else {
          const destination = document.querySelector(
            `#output-destination-${outputDestinationNumber} video`
          );

          window.secondaryMonitor = window.open(
            undefined,
            "_blank",
            `top=0, left=${
              screen.width
            }, width=500px, height=500px, toolbar=0, frame=0, scrollbars=0, title=Output-destination-${outputDestinationNumber}`
          );

          console.log(destination);

          $this.$store.commit("setIsProjecting", true);

          return (() => {
            window.secondaryMonitor.onload = () =>
              (window.secondaryMonitor.document.body.innerHTML = `
                    <h1>Hello</h1>
                    <canvas>&nbsp;</canvas>
                    `);
          })();
        }
      } else
        return window.M.toast({
          html: "Nothing to project",
          classes: "red bold rounded"
        });
    },
    toggleRecord($event, count) {
      const $this = this;
      const videoEl = document.querySelector(
        `#output-destination-${count} video`
      );

      if (videoEl.srcObject) {
        if ($this.$store.state.isRecording === false) {
          window[`outputDestination${count}`] = {};
          window[`outputDestination${count}`].__recordedChunks = [];
          let stream = videoEl.captureStream(100);
  
          const options = { mimeType: "video/webm;codecs=vp9" };
          window[`outputDestination${count}`].__mediaRecorder = new MediaRecorder(stream, options);

          const handleDataAvailable = event => {
            //if (event.data.size > 0) {
              window[`outputDestination${count}`].__recordedChunks.push(event.data);
            //}
          };

          window[`outputDestination${count}`].__mediaRecorder.ondataavailable = handleDataAvailable;

          window[`outputDestination${count}`].__mediaRecorder.onerror = e => {
            window.M.toast({
              html: `${e.toString}`,
              classes: "rounded red bold"
            });
          };

          

          return {a: $this.$store.commit("setIsRecording", true), b: window[`outputDestination${count}`].__mediaRecorder.start()};
        } else {
          if (window[`outputDestination${count}`].__mediaRecorder && window[`outputDestination${count}`].__recordedChunks) {

            window[`outputDestination${count}`].__mediaRecorder.onstop = () => {
              const blobArray = window[`outputDestination${count}`].__recordedChunks;
              const blob = blobArray[0];
              const name = `Record-${((new Date()).toString()).split(':').join('-').split(" ").join("_")}.webm`;
              $this.$store.dispatch('addRecordingAsync', {
                name,
                blob,
                id: $this.$store.state.recordings.length + 1
              });
              window[`outputDestination${count}`].__recordedChunks = [];
            }

            window[`outputDestination${count}`].__mediaRecorder.stop();

            }
          window[`outputDestination${count}`].__mediaRecorder = undefined;

          return $this.$store.commit("setIsRecording", false);
        }
      } else {
        window.M.toast({
          html: "Nothing to record",
          classes: "rounded bold red"
        });
      }
    },
    stream(){},
    onDrop($event){

      $event.preventDefault();

      let files = [];
      
      if ($event.dataTransfer.files) {

        files.push(...(Array.from($event.dataTransfer.files)));

      } else {

        (Array.from($event.dataTransfer.items)).forEach(item => {
          if (item.kind && (item.kind === 'file')){
            files.push(item.getAsFile());
          }
        });

      }

      (Array.from(files)).forEach(file => {
        console.log('File drop event');
        console.log(`File Name: ${file.name}`);
        console.log(`FIle size: ${file.size/1000000}mb`);
      });

      return files;

    },
  },
  components: {
    InputSource,
    // OutputDestination,
    EditorBottomNoInput,
    ElectronDesktopCaptureModal,
    AudioEqualizer
  }
};

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
    margin: 0px !important;
    height: 35px !important;
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
}
.bottom-section{
    height: calc(50% - 37px);
    overflow-y: hidden;
}
.top-section{
    height: 100% !important;
    padding: 0px !important;
    margin: 0px !important;
    border-bottom: thin solid #434a5f;
    border-top: thin solid #434a5f;
    margin: 0px !important;
    padding: 0px !important;
}
.horizontal-scroll{
    white-space: nowrap;
    overflow-x: auto;
    display: block;
    width: 100%;
    overflow-y: hidden;
}
input[type=range]{
  height: 25px !important;
  line-height: 2px !important;
  padding: 0px !important;
  margin: 0px !important;
  width: 200px !important;
}
.horizontal-scroll-child{
    display: inline-block;
    height: 100% !important;
    width: 50%;
    border: thin solid #434a5f;
    overflow-y: auto !important;
}
.fill{
    width: 100% !important;
    height: 100% !important;
}
#preview{
    object-fit: contain !important;
}

.output-destination{
    border: thin solid #000000;
}

.output-destination, .output-destination div, .output-destination video{
    margin: 0px !important;
    padding: 0px !important;
}

.output-destination .output-destination-top-block{
    height: 85% !important;
}

.output-destination .output-destination-bottom-block{
    height: 15%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}
.output-destination .output-audio-channel-visualizer{
    height: 100% !important;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    justify-content: center;
}

.output-destination .output-audio-channel-visualizer .s3{
    height: calc(100% - 10px);
    display: block;
}

.output-audio-channel-visualizer .s3 div{
    height: calc(100% - 20px);
    width: 100%;
    display: block;
    background-color: #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
}

.s3 div .output-audio-channel-progress-bar{
    width: calc(100% - 4px);
    max-height: calc(100% - 4px);
}

.output-destination video.output-video-visualizer{
    height: 100% !important;
}
.select-dropdown.dropdown-content{
  z-index: 100000000000000 !important;
  margin-top: 150px !important;
  padding-top: 50px !important;
}

#switch-preview-and-output-slider{
  display: flex;
  align-items: center;
  justify-content: space-between;
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