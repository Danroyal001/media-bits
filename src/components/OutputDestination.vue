<template>
<div :id="'output-destination-' + id" class="col s12 m12 l6 x6 top-section-block">
    <div class="teal white-text top-section-header">OUTPUT DESTINATION {{ index + 1 }}</div>
    <video class="top-section-view black" controls autoplay></video>
</div>
</template>

<script>
export default {
    name: 'output-destination',
    props: {
        id: {
            type: Number,
            required: false,
            validate(index){
                return 'number' === typeof index;
            }
        },
        index: {
            type: Number,
            required: true,
            validate(index){
                return 'number' === typeof index;
            }
        }
    }
}
</script>

<style>

</style>