<template>
<div class="black" style="display: flex; height: 50%; align-items: center; justify-content: center;">
    <h1 class="btn-small dropdown-trigger waves-effect waves-light pulse" data-target="add-input-dropdown-2">ADD INPUT</h1>
    <AddInputDropdown id="add-input-dropdown-2" />
</div>
</template>

<script lang="ts">
import AddInputDropdown from '@/components/AddInputDropdown.vue';

const doTheNeedful = () => {
    window.M.AutoInit();
}

export default {
    name: 'editor-bottom-no-input',
    components: {
        AddInputDropdown
    },
    mounted: doTheNeedful,
    created: doTheNeedful,
    updated: doTheNeedful
}
</script>

<style>

</style>