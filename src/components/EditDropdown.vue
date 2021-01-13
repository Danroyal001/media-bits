<template>
<ul id='edit-dropdown' class='dropdown-content'>
    <li v-for="(btn, index) in btns" :key="index + 'abc'"><a :class="btn.class" class="bold" :href="btn.href" @click="btn.onclick">{{ btn.label }}</a></li>
</ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'edit-dropdown',
    data(){
        return {
            btns: [
                {
                    label: "Undo",
                    onclick(){},
                    href: "",
                    class: ""
                },
                {
                    label: "Redo",
                    onclick(){}
                },
                {
                    label: "Cut",
                    onclick(){}
                },
                {
                    label: "Copy",
                    onclick(){}
                },
                {
                    label: "Paste",
                    onclick(){}
                }
            ]
        };
    }
});
</script>