<template>
<ul id="nav-mobile" class="right hide-on-med-and-down">
    <li>
        <a class="btn-small waves-effect waves-light dropdown-trigger" data-target="file-submenu-dropdown">FILE</a>
    </li>
    <li v-for="(btn, i) in $store.state.editorBtns" :key="i" @click="btn.onclick">
        <a class="btn-small waves-effect waves-light" :href="btn.href" :class="btn.class" :data-target="btn.dataTarget">{{ btn.title }}</a>
    </li>
    <li v-if="window.electron" class="waves-effect black">
        <a @click="window.minimize()" class="btn-small minmax waves-light">_</a>
        <a @click="window.minimize()" class="btn-small minmax waves-light">|_|</a>
        <a @click="window.minimize()" class="btn-small minmax waves-light red">&times;</a>
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
    data(){
        return {
            window
        }
    },
    created: doTheNeedful,
    mounted: doTheNeedful,
    updated: doTheNeedful
}
</script>

<style>
.minmax{
    padding-left: 5px !important;
    padding-right: 5px !important;
}
</style>