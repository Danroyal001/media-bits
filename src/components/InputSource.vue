<template>
<div @click="setFocusedInputSource" class="horizontal-scroll-child input-source">
    <div :class="['header', $store.state.focusedInputSource === count - 1 ? 'orange black-text' : 'teal white-text']">
        <span>Input Source {{ count }} &nbsp; <i @click="removeSource" class="btn-small red white-text waves-effect waves-light close-btn">&times;</i></span>
    </div> 
    <div class="body black">
        <video autoplay v-if="source.type.toLowerCase().includes('video')" :id="'inputVisual' + count" muted loop controls :title="source.title" class="fill-parent"></video>
        <audio autoplay v-else-if="source.type.toLowerCase().includes('audio')" :id="'inputVisual' + count" loop controls :title="source.title" class="fill-parent"></audio>
        <img v-else-if="source.type.toLowerCase().includes('image')" :id="'inputVisual' + count" :title="source.title" class="fill-parent" />
    </div>
    <div class="footer black">
        <marquee scrollamount="4" :class="['btn-small', $store.state.focusedInputSource === count - 1 ? 'orange black-text' : 'teal', 'truncate']">NAME: {{ source.name || '----|----' }}</marquee>
        <div :class="['btn-small', $store.state.focusedInputSource === count - 1 ? 'orange black-text' : 'teal']">TYPE: {{ source.type || '----|----' }}</div>
        <div :class="['btn-small', $store.state.focusedInputSource === count - 1 ? 'orange black-text' : 'teal', 'waves-effect', 'waves-light']">CONFIGURATION <i class="fas fa-wrench"></i></div>
    </div>
</div>
</template>

<script>
export default {
    name: 'input source',
    methods: {
        removeSource(){
            const _$this = this;
            const elem = window.document.querySelector('#inputVisual' + _$this.count);
            if(elem.srcObject){
                elem.srcObject.getTracks().forEach(track => track.stop());
            } 
            window.$store.commit('setFocusedInputSource', this.count - 2);
            return window.$store.commit('removeInputSource', _$this.source.id);
        },
        setFocusedInputSource(){
            const count = this.count;
            const src = this.source.type.toLowerCase();
            const elem = window.document.querySelector('#inputVisual' + this.count);
            const preview = window.document.querySelector('#preview');

            if((src.includes('video file') || src.includes('audio file')) && preview){
                preview.src = elem.src;
            } else if (src.includes('image') && preview){
                preview.src = elem.src;
            } else if ((src.includes('video') && src.includes('live') && !src.includes('audio')) && preview){
                preview.srcObject = elem.srcObject;
            }

            return window.$store.commit('setFocusedInputSource', count - 1);
        }
    },
    mounted(){
        let _$this = this;
        const _$elem = window.document.querySelector('#inputVisual' + _$this.count);
        const addSrc = e => {
            e.src = _$this.source.data;
            e.pause();
            e.scrollIntoView(true);
            return setTimeout(() => e.pause(), 500);
        }
        switch(_$this.source.type.toLowerCase()){
            case 'audio file':
                (() => addSrc(_$elem))();
                break;
            case 'video file':
                (() => addSrc(_$elem))();
                break;
            case 'live audio input':
                (() => addSrc(_$elem))();
                break;
            case 'live video input':
                (() => addSrc(_$elem))();
                break;
            case 'video input from url':
                (() => {})();
                break;
            case 'audio input from url':
                (() => {})();
                break;
            case 'image file':
                (() => _$elem.src = _$this.source.data)();
                break;
            case 'image from url':
                (() => {})();
                break;
            case 'live desktop capture (video)':
                (() => _$elem.srcObject = _$this.source.data)();
                break;
            case 'layout template':
                (() => {})();
                break;
            default:
                return;
        }
    },
    data(){
        return {
            refinedData: ''
        }
    },
    props:{
        count:{
            type: Number,
            required: true,
            validate(count){
                return Boolean('number' === typeof count);
            }
        },
        source: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.fill-parent{
    width: 100%;
    height: 100%;
}
.input-source{
    width: 250px;
    height: 100%;
    border-right: thin solid teal;
    border-left: thin solid teal;
}
.header{
    font-size: 14px;
    height: 10% !important;
    border-top: thin solid #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.body{
    height: 55% !important;
}
.footer{
    height: 35%  !important;
    border-bottom: thick solid #000000;
    /* border-top: thin solid #009688; */
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-end;
    flex-wrap: wrap-reverse;
}
.footer > .btn-small, footer > div{
    /* height: 24px; */
    height: 33.333%;
    font-size: 11px;
}
.close-btn{
    color: #f00;
}
img{
    object-fit: contain;
}
</style>