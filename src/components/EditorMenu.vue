<template>
<ul id="nav-mobile" class="right hide-on-med-and-down bold">
    <li>
        <a class="btn-small waves-effect waves-light dropdown-trigger" data-target="file-submenu-dropdown">FILE</a>
    </li>
    <li v-for="(btn, i) in $store.state.editorBtns" :key="i" @click="btn.onclick">
        <a class="btn-small waves-effect waves-light" :href="btn.href" :class="btn.class" :data-target="btn.dataTarget">{{ btn.title }}</a>
    </li>
    <AddInputDropdown />
    <FileSubmenuDropdown />
    <EditDropdown />
</ul>  
</template>

<script lang="ts">
import AddInputDropdown from '@/components/AddInputDropdown.vue';
import FileSubmenuDropdown from '@/components/FileSubmenuDropdown.vue';
import EditDropdown from '@/components/EditDropdown.vue';

const doTheNeedful = () => {
    (window as any).M.AutoInit();
};

export default {
    name: 'editor-menu',
    components: {
        AddInputDropdown,
        FileSubmenuDropdown,
        EditDropdown
    },
    created: doTheNeedful,
    onMounted: doTheNeedful,
    updated: doTheNeedful
}
</script>

<style>

</style>