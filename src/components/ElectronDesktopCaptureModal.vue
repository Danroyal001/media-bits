<template>
<!-- Begin Electron desktop Capture modal -->
<div id="electron-desktop-capture-modal" class="modal">
    <div class="modal-content">
      <h4>Select Screen/Window <i class="fa fa-desktop"></i></h4>
      <br />
      <select v-model="selectedStream" @change="resolve">
          <option v-for="streamSource in streamSources" :key="streamSource" :id="streamSource" :value="streamSource.id">{{ source }}</option>
      </select>
    </div>
    <!-- <div class="modal-footer">
    </div> -->
</div>
<!-- End Electron desktop Capture modal -->
</template>

<script>
export default {
    name: 'electron-desktop-capture-modal',
    data(){
        return {
            sources: [],
            selected: ''
        }
    },
    props: ['streamSources'],
    mounted(){
        window.electron.desktopCapturer.getSources({types: ['screen', 'window']}).then(console.log).catch(console.log);
    },
    methods: {
        resolve(){
            this.$emit('data', this.selectedStream);
            this.$el.M_Modal.close();
        }
    }
}
</script>

<style>

</style>