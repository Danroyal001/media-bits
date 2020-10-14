<template>
<div class="horizontal-scroll-child input-source">
    <div class="header teal">
        <span class="white-text">Input Source {{ count }}</span>
    </div>
    <div class="body black">
        &nbsp;
    </div>
    <div class="footer black">
        <div class="btn-small">NAME: {{ source.name }}</div>
        <div class="btn-small">TYPE: {{ source.type }}</div>
        <div class="btn-small">POSITION: </div>
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
            required: false
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
.footer > .btn-small{
    height: 24px;
}
</style>