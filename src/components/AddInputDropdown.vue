<template>
<ul id='add-input-dropdown-1' class='dropdown-content'>
    <li v-for="(btn, index) in data" :key="index"><a :class="btn.class" class="bold" :href="btn.href" @click="btn.onclick">{{ btn.label }}</a></li>
</ul>
</template>

<script>
export default {
    name: 'add-input-dropdown',
    data(){
        return {
            data: [
                {
                    label: 'Video File',
                    onclick(){
                        window.$store.dispatch('loadFile', {
                            fileType: 'video/*',
                            isText: false
                        }).then(file => {
                            const fr = new window.FileReader();
                            fr.onload = () => {
                                let refinedFile = fr.result;
                                window.$store.commit('addInputSource', {
                                name: file.name,
                                id: Math.random(),
                                type: 'video file',
                                file,
                                data: refinedFile,
                                position: 0
                            })
                            }
                            fr.readAsDataURL(file);
                        }).catch(e => window.M.toast({
              html: e,
              classes: 'bold red rounded'
            }))
                    }
                },
                {
                    label: 'Audio File',
                    onclick(){
                        window.$store.dispatch('loadFile', {
                            fileType: 'audio/*, video/*',
                            isText: false
                        }).then(file => {
                            const fr = new window.FileReader();
                            fr.onload = () => {
                                let refinedFile = fr.result;
                                window.$store.commit('addInputSource', {
                                name: file.name,
                                id: Math.random(),
                                type: 'audio file',
                                file,
                                data: refinedFile,
                                position: 0
                            })
                            }
                            fr.readAsDataURL(file);
                        }).catch(e => window.M.toast({
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
                    label: 'Remote Input from URL',
                    onclick(){}
                },
                {
                    label: 'Audio Input from URL',
                    onclick(){}
                },
                {
                    label: 'Image File',
                    onclick(){}
                },
                {
                    label: 'Image from URL',
                    onclick(){}
                },
                {
                    label: 'Desktop Capture (Video)',
                    onclick(){
                        const addSource = stream => {
                            window.$store.commit('addInputSource', {
                                name: 'Desktop Capture (Video)',
                                id: Math.random(),
                                type: 'desktop capture (video)',
                                data: stream,
                                position: 0
                            })
                        }
                        if (window.isElectron){
                            document.querySelector('#electron-desktop-capture-modal').M_Modal.open()
                        } else {
                            window.navigator.mediaDevices.getDisplayMedia({
                                video: {
                                    cursor: 'motion'
                                },
                                audio: false
                            }).then(stream => addSource(stream)).catch(e => window.M.toast({
                                    html: `${e}`,
                                    classes: 'bold red rounded'
                                }))
                        }
                        
                    }
                },
                {
                    label: 'Layout Template',
                    onclick(){}
                }
            ]
        };
    }
}
</script>

<style>

</style>