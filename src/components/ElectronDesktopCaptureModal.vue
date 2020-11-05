<template>
<!-- Begin Electron desktop Capture modal -->
<div id="electron-desktop-capture-modal" class="modal">
    <div class="modal-content">
      <h4>Select Screen/Window <i class="fa fa-desktop"></i></h4>
      <br />

    <div style="height: 280px; !important; overflow: auto;">
        <p v-for="streamSource in streamSources" :key="streamSource.toString()" :id="streamSource.toString()">
      <label>
        <input v-model="selectedStream" class="with-gap" name="source" type="radio" :value="streamSource.id"  />
        <span class="bold">{{ streamSource.name }}</span>
      </label>
    </p>
    </div>

    </div>
    <div class="modal-footer">
        <button class="btn-small red waves-effect waves-light modal-close">CLOSE</button>
        <button @click="resolve" class="btn-small teal modal-close waves-effect waves-light">DONE</button>
    </div>
</div>
<!-- End Electron desktop Capture modal -->
</template>

<script>
export default {
    name: 'electron-desktop-capture-modal',
    data(){
        return {
            streamSources: [],
            selectedStream: '',
            mounted: false
        }
    },
    //props: ['streamSources'],
    beforeCreate(){
        if(window.isElectron){
            window.electron.desktopCapturer.getSources({types: ['screen', 'window']}).then(sources => {
            this.streamSources = sources
            this.mounted = true;
        }).catch(console.log);
        }
    },
    methods: {
        resolve(){
            const selected = this.selectedStream;
            return window.navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: selected,
              minWidth: 1280,
              maxWidth: 1280,
              minHeight: 720,
              maxHeight: 720
            }
          }
        }).then(stream => {
            window.$store.commit('addInputSource', {
                                name: 'Desktop Capture (Video)',
                                id: Math.random(),
                                type: 'desktop capture (video)',
                                data: stream,
                                position: 0
                            });
                            return setTimeout(window.focus, 1000);
        }).catch(e => window.M.toast({
                                    html: `${e}`,
                                    classes: 'bold red rounded'
                                }))
        }
    }
}
</script>

<style>
.modal, .modal-content{
    overflow: hidden !important;
}
</style>