    <template>
<div class="editor-root">
<!-- Start Editor Root -->
<div class="row top-section">
    <div class="col s12 m12 l6 x6"></div>
    <div class="col s12 m12 l6 x6"></div>
</div>
<div class="row"></div>
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
    height: calc(100% - 56px);
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