<template>
<div class="editor-root black">
<!-- Start Editor Root -->

<!-- Start Top Section -->
<div class="top-section horizontal-scroll">
    
    <div class="horizontal-scroll-child horizontal-scroll-child-1 white-text">
        <div v-if="$store.state.inputSources[$store.state.focusedInputSource]" class="black white-text fill" style="display: block !important; overflow: hidden;">
            <div style="width: 100%; height: 20px; font-size: 15px;" class="center bold white-text teal">Preview</div>

            <video id="preview" muted loop autoplay v-if="($store.state.inputSources[$store.state.focusedInputSource]) && ($store.state.inputSources[$store.state.focusedInputSource].type.toLowerCase().includes('video'))" style="width: 100%; height: calc(100% - 20px);" controls></video>

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
                <video class="col s11 output-video-visualizer" controls loop></video>
            </div>
            <div class="col s12 orange output-destination-bottom-block">
                <button @click="project($event, (_index + 1))" :class="['btn-small', $store.state.isProjecting ? 'red' : 'teal', 'white-text', 'waves-effect', 'waves-light', 'bold']">PROJECT <i class="fa fa-desktop"></i></button>

                <button class="btn-small teal white-text waves-effect waves-light bold">STREAM <i class="fa fa-wifi"></i></button>

                <button @click="toggleRecord($event, (_index + 1))" :class="['btn-small', $store.state.isRecording ? 'red' : 'teal', 'white-text', 'waves-effect', 'waves-light', 'bold']">RECORD <i class="fa fa-video"></i></button>

                <button class="btn-small teal white-text waves-effect waves-light bold">CONFIG <i class="fa fa-wrench"></i></button>
            </div>
        </div>
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
      <div>
          <div v-for="camera in cameras" :key="camera" class="teal-text">{{ camera.label }}</div>
      </div>
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
      middleSectionBtns: [],
      microphones: [],
      cameras: [],
      selectedCamera: {},
      selectedMic: {},
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
      window.navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: false
        })
        .then(stream => {
          window.$store.commit("addInputSource", {
            name: "Microphone",
            id: Math.random(),
            type: "live audio input",
            data: stream,
            position: 0
          });
        });
    },
    addLiveVideo() {
      window.navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            torch: true
          }
        })
        .then(stream => {
          window.$store.commit("addInputSource", {
            name: "Camera",
            id: Math.random(),
            type: "live video input",
            data: stream,
            position: 0
          });
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
            }, width=500px, height=500px, toolbar=0, scrollbars=0, title=Output-destination-${outputDestinationNumber}`
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
          window.__recordedChunks = [];
          let stream = videoEl.captureStream(100);

          const options = { mimeType: "video/webm;codecs=vp9" };
          window.__mediaRecorder = new MediaRecorder(stream, options);
          window.__mediaRecorder.onerror = e => {
            window.M.toast({
              html: `${e.toString}`,
              classes: "rounded red bold"
            });
          };
          window.__mediaRecorder.ondataavailable = event =>
            handleDataAvailable(event);
          window.__mediaRecorder.start();

          const handleDataAvailable = event => {
            if (event.data.size > 0) {
              window.__recordedChunks.push(event.data);
            }
          };

          return $this.$store.commit("setIsRecording", true);
        } else {
          if (window.__mediaRecorder && window.__recordedChunks) {
            window.__mediaRecorder.stop();
            const blob = new Blob(window.__recordedChunks)
            const dataURL = URL.createObjectURL(blob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.href = dataURL;
            a.click();
            URL.revokeObjectURL(a)
            a.remove();
            }
          window.__mediaRecorder = undefined;

          return $this.$store.commit("setIsRecording", false);
        }
      } else {
        window.M.toast({
          html: "Nothing to record",
          classes: "rounded bold red"
        });
      }
    }
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
    border-bottom: thin solid #009688;
    border-top: thin solid #009688;
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
.horizontal-scroll-child{
    display: inline-block;
    height: 100% !important;
    width: 50%;
    border: thin solid #009688;
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