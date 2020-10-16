<template>
<ul id="nav-mobile" class="right hide-on-med-and-down">
    <li v-for="(btn, i) in $store.state.editorBtns" :key="i" @click="btn.onclick"><a class="btn-small waves-effect waves-light" :class="btn.class" :data-target="btn.dataTarget">{{ btn.title }}</a></li>
    <AddInputDropdown id="add-input-dropdown-1" />
</ul>  
</template>

<script>
import AddInputDropdown from '@/components/AddInputDropdown.vue'

const doTheNeedful = () => {
    window.M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'));
};

export default {
    name: 'editor-menu',
    components: {
        AddInputDropdown
    },
    created: doTheNeedful,
    mounted: doTheNeedful,
    updated: doTheNeedful
}
</script>

<style>

</style>