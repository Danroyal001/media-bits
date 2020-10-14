    <template>
<div class="editor-root">
<!-- Start Editor Root -->

<!-- Start Top Section -->
<div class="row top-section">
    <div class="col s12 m12 l6 x6">
        <div class="teal white-text top-section-header">PREVIEW</div>
        <canvas id="preview" class="top-section-view black"></canvas>
    </div>
    <div class="col s12 m12 l6 x6">
        <div class="teal white-text top-section-header">LIVE</div>
        <video id="live" class="top-section-view black" autoplay></video>
    </div>
</div>
<!-- End Top Section -->

<!-- Start Middle Section -->
<div class="teal middle-section row"></div>
<!-- End Middle section -->

<div class="horizontal-scroll black" style="overflow-y: hidden;">
    <div v-for="x in 10" :key="x" class="horizontal-scroll-child input-source"></div>
</div>

<!-- End Editor Root -->
</div>
</template>

<script>
export default {
    name: 'Editor'
}
</script>

<style>
.editor-root{
    width: 100% !important;
    /* height: calc(100% - 56px); */
    overflow: hidden;
    background-color: #ecedef;
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
.middle-section{
    width: 100% !important;
    margin: 0px;
    height: 20px !important;
}
.horizontal-scroll{
    white-space: nowrap;
    height: calc(50% - 22px);
    overflow-x: auto;
}
.horizontal-scroll-child{
    display: inline-block;
    width: 300px;
    height: 100%;
    border-right: thin solid teal;
}

@media only screen and (min-width: 600px) and (max-width: 992px) {
/* Medium Screen */
    .editor-root{
        height: calc(100% - 64px);
    }
    .top-section{
        height: 50% !important;
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