<template>
<ul id="nav-mobile" class="right hide-on-med-and-down">
    <li>
        <a class="btn-small waves-effect waves-light dropdown-trigger" data-target="file-submenu-dropdown">FILE</a>
    </li>
    <li v-for="(btn, i) in $store.state.editorBtns" :key="i" @click="btn.onclick">
        <a class="btn-small waves-effect waves-light" :href="btn.href" :class="btn.class" :data-target="btn.dataTarget">{{ btn.title }}</a>
    </li>
    <AddInputDropdown id="add-input-dropdown-1" />
    <FileSubmenuDropdown />
</ul>  
</template>

<script>
import AddInputDropdown from '@/components/AddInputDropdown.vue';
import FileSubmenuDropdown from '@/components/FileSubmenuDropdown.vue';

const doTheNeedful = () => {
    window.M.AutoInit();
};

export default {
    name: 'editor-menu',
    components: {
        AddInputDropdown,
        FileSubmenuDropdown
    },
    created: doTheNeedful,
    mounted: doTheNeedful,
    updated: doTheNeedful
}
</script>

<style>

</style>