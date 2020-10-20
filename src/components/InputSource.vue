<template>
<div class="horizontal-scroll-child input-source">
    <div class="header teal">
        <span class="white-text">Input Source {{ count }} &nbsp; <i @click="$store.commit('removeInputSource', source.id)" class="btn-small red white-text waves-effect waves-light close-btn">&times;</i></span>
    </div>
    <div class="body black">
        &nbsp;
    </div>
    <div class="footer black">
        <!-- <div class="btn-small teal truncate">NAME: {{ source.name.substring(0, 24) + '...' || '----|----' }}</div> -->
        <marquee speed="2" class="btn-small teal truncate">NAME: {{ source.name || '----|----' }}</marquee>
        <div class="btn-small teal">TYPE: {{ source.type || '----|----' }}</div>
        <div class="btn-small waves-effect waves-light">CONFIG <i class="fas fa-wrench"></i></div>
    </div>
</div>
</template>

<script>
export default {
    name: 'InputSource',
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
</style>