<template>
<!-- Modal Structure -->
  <div id="authentication-modal" :class="['modal', 'modal-fixed-footer']">
    <div class="modal-content">
      <!-- firebase auth ui -->
    </div>
    <div class="modal-footer teal">
      <a class="modal-close waves-effect waves-light btn red white-text">CANCEL</a>
    </div>
  </div>
</template>

<script>
const firebaseui = require("firebaseui");

export default {
    name: "authentication-modal",
    mounted(){
        return this.signIn();

    },
    data(){
        return {
            modalInnerSelector: '#authentication-modal.modal > .modal-content'
        }
    },
    methods: {
        signIn(){
            // Initialize the FirebaseUI Widget using Firebase.
            let ui = new firebaseui.auth.AuthUI(window.__firebase.auth());

            ui.start(this.modalInnerSelector, {
                signInOptions: [
                    window.__firebase.auth.EmailAuthProvider.PROVIDER_ID
                ],
            // Other config options...
            });
        }
    }
}
</script>

<style scoped>
h1.firebaseui-title, h1, h2, h3, h4, h5{
    font-size: 30px !important;
}

.modal-content{
    overflow-x: hidden;
    overflow-y: auto !important;
}
</style>