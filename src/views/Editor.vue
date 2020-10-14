    <template>
<div class="editor-root">
<!-- Start Editor Root -->

<!-- Start Top Section -->
<div class="row top-section horizontal-scroll" style="padding: 0px !important; margin: 0px !important;">
    <div class="horizontal-scroll-child" style="width: 100%; height: 100%; padding: 0px !important; margin: 0px !important;">
        <div class="col s12 m12 l6 x6" style="padding: 0px !important; margin: 0px !important; border-right: thin solid teal;">
            <div class="teal white-text top-section-header">PREVIEW</div>
            <video class="top-section-view black" autoplay></video>
        </div>
        <div v-for="(output, index) in 5" :key="index" class="col s12 m12 l6 x6" style="padding: 0px !important; margin: 0px !important; border-right: thin solid teal;">
            <div class="teal white-text top-section-header">OUTPUT {{ index+1 }}</div>
            <canvas class="top-section-view black"></canvas>
        </div>
    </div>
</div>
<!-- End Top Section -->

<!-- Start Middle Section -->
<div class="teal middle-section row"></div>
<!-- End Middle section -->

<div v-if="$store.state.inputSources.length > 0" class="horizontal-scroll black bottom-section">
    <InputSource v-for="(source, index) in $store.state.inputSources" :key="index" :source="source" :count="(index + 1)"></InputSource>
</div>

<!-- End Editor Root -->
</div>
</template>

<script>
import InputSource from '@/components/InputSource.vue';

export default {
    name: 'Editor',
    components: {
        InputSource
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
    height: calc(100% - 15px);
}
.horizontal-scroll{
    white-space: nowrap;
    overflow-x: auto;
}
.horizontal-scroll-child{
    display: inline-block;
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