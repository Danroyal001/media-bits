<template>
<div class="black" style="display: flex; height: 50%; align-items: center; justify-content: center; flex-direction: column; text-align: center;">
    <h4 class="white-text">
        <i class="fa fa-desktop"></i>
        <i class="fa fa-globe"></i>
        <i class="fa fa-wifi"></i>
        <i class="fa fa-image"></i>
    </h4>
    <h1 title="click here to add an input source" class="btn-small bold dropdown-trigger waves-effect waves-light pulse" data-target="add-input-dropdown-2">CLICK HERE TO ADD INPUT SOURCE</h1>
    <AddInputDropdown id="add-input-dropdown-2" />
</div>
</template>

<script lang="ts">
import AddInputDropdown from '@/components/AddInputDropdown.vue';
import { defineComponent } from 'vue';

const doTheNeedful = () => {
    window.M.AutoInit();
}

export default defineComponent({
    name: 'editor-bottom-no-input',
    components: {
        AddInputDropdown
    },
    mounted: doTheNeedful,
    created: doTheNeedful
})
</script>

<style>

</style>