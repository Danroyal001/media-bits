<template>
  <ul id="more-hyperlinks-dropdown" class="dropdown-content bold">
        <li v-for="link in $store.state.secondaryHyperlinks" :key="link"><router-link :to="link.href">{{ link.name }}</router-link></li>
    </ul>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "MoreHyperlinksDropdownOnHomepage",
    methods: {
        doTheNeedful(){
            return window.M.AutoInit();
        }
    },
    mounted(){
        return this.doTheNeedful();
    },
    onMounted(){
        return this.doTheNeedful();
    },
    updated(){
        return this.doTheNeedful();
    }
});
</script>

<style scoped>
</style>