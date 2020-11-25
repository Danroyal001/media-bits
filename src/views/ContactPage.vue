<template>
<div>
    <div class="container">
        <form></form>
    </div>

    <FooterComponent />
</div>
</template>

<script lang="ts">
import FooterComponent from "@/components/FooterComponent.vue";

export default {
    name: 'contact-page',
    data(){
        return {
            name: "",
            email: "",
            company: ""
        }
    },
        components: {
            FooterComponent
        }
}
</script>

<style>

</style>