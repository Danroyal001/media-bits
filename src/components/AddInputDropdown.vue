<template>
<ul id='add-input-dropdown-1' class='dropdown-content'>
    <li v-for="(btn, index) in btns" :key="index"><a :class="btn.class" class="bold" :href="btn.href" @click="btn.onclick">{{ btn.label }}</a></li>
</ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
//import * as M from "@/assets/js/materialize.min.js";


export default defineComponent({
    name: 'add-input-dropdown',
    data(){
        return {
            btns: [
                {
                    label: 'Video File',
                    onclick(){
                        (window as any).$store.dispatch('loadFile', {
                            fileType: 'video/*',
                            isText: false
                        }).then((file: Blob) => {
                        (window as any).$store.commit('setGlobalLoaderText', 'Importing Video');
                        (document.querySelector('#global-loader-modal') as any).M_Modal.open();
                            const fr = new window.FileReader();
                            fr.onload = () => {
                                let refinedFile = fr.result;
                                (window as any).$store.commit('addInputSource', {
                                name: (file as any).name!!,
                                id: Math.random(),
                                type: 'video file',
                                file,
                                data: refinedFile,
                                position: 0
                            });
                            (document.querySelector('#global-loader-modal') as any).M_Modal.close();
                            }
                            fr.readAsDataURL(file);
                        }).catch((e: any) => {
                            (window.M as any).toast({
              html: e,
              classes: 'bold red rounded'
            });
            (document.querySelector('#global-loader-modal') as any).M_Modal.close()
                        })
                    }
                },
                {
                    label: 'Audio File',
                    onclick(){
                        (window as any).$store.dispatch('loadFile', {
                            fileType: 'audio/*, video/*',
                            isText: false
                        }).then((file: Blob) => {
                            const fr = new window.FileReader();
                            fr.onload = () => {
                                let refinedFile = fr.result;
                                (window as any).$store.commit('addInputSource', {
                                name: (file as any).name,
                                id: Math.random(),
                                type: 'audio file',
                                file,
                                data: refinedFile,
                                position: 0
                            })
                            }
                            fr.readAsDataURL(file);
                        }).catch((e: any) => (window.M as any).toast({
              html: e,
              classes: 'bold red rounded'
            }))
                    }
                },
                {
                    label: 'Image File',
                    onclick(){
                        (window as any).$store.dispatch('loadFile', {
                            fileType: 'image/*',
                            isText: false
                        }).then((file: Blob) => {
                            const fr = new window.FileReader();
                            fr.onload = () => {
                                let refinedFile = fr.result;
                                (window as any).$store.commit('addInputSource', {
                                name: (file as any).name,
                                id: Math.random(),
                                type: 'image file',
                                file,
                                data: refinedFile,
                                position: 0
                            })
                            }
                            fr.readAsDataURL(file);
                        }).catch((e: any) => (window.M as any).toast({
              html: e,
              classes: 'bold red rounded'
            }))
                    }
                },
                {
                    label: 'Live Video Input',
                    onclick(){
                    },
                    href: '#select-camera-modal',
                    class: 'modal-trigger'
                },
                {
                    label: 'Live Audio Input',
                    onclick(){},
                    href: '#select-microphone-modal',
                    class: 'modal-trigger'
                },
                {
                    label: 'Video Input from URL',
                    onclick(){},
                    href: '#audio-from-url-modal',
                    class: 'modal-trigger'
                },
                {
                    label: 'Audio Input from URL',
                    onclick(){},
                    href: '#audio-from-url-modal',
                    class: 'modal-trigger'
                },
                {
                    label: 'Image from URL',
                    onclick(){},
                    href: '#image-from-url-modal',
                    class: 'modal-trigger'
                },
                {
                    label: 'Live Desktop Capture (Video)',
                    onclick(){
                        const addSource = (stream: any) => {
                            (window as any).$store.commit('addInputSource', {
                                name: 'Live Desktop Capture (Video)',
                                id: Math.random(),
                                type: 'live desktop capture (video)',
                                data: stream,
                                position: 0
                            })
                        }
                        if ((window as any).isElectron){
                            (document.querySelector('#electron-desktop-capture-modal') as any).M_Modal.open()
                        } else {
                            (window.navigator.mediaDevices as any).getDisplayMedia({
                                video: {
                                    cursor: 'motion'
                                },
                                audio: false
                            }).then((stream: any) => addSource(stream)).catch(() => (window.M as any).toast({
                                    html: `Unable to get desktop capture on your device`,
                                    classes: 'bold red rounded'
                                }))
                        }
                        
                    }
                },
                {
                    label: 'Title / Epic Scene',
                    onclick(){}
                },
                {
                    label: 'Colo(u)r view',
                    onclick(){}
                },
                {
                    label: 'Browser view',
                    onclick(){}
                },
                {
                    label: 'Existing Media-Bits project',
                    onclick(){}
                }
            ]
        };
    }
})
</script>

<style>

</style>