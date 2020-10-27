<template>
<ul id='file-submenu-dropdown' class='dropdown-content'>
    <li v-for="(btn, index) in $store.state.fileSubmenuDropdown" :key="index" :disabled="(index === 1 )? true : false"><a @click="btn.onclick" :disabled="(index === 1 )? true : false">{{ btn.title }}</a></li>
</ul>
</template>

<script>
export default {
    name: 'file-submenu-dropdown'
}
</script>

<style>

</style>