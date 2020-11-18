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
  mounted() {
    const $this = this;
    const elems = document.querySelectorAll("#authentication-modal.modal");
    const options = {
      onOpenStart() {
        // Initialize the FirebaseUI Widget using Firebase.
        const ui = new firebaseui.auth.AuthUI(window.__firebase.auth());
        
        const uiConfig = {
          callbacks: {
            signInSuccessWithAuthResult() {
              return false;
            },
            uiShown() {
              // The widget is rendered.
              // Hide the loader.
              // document.getElementById('loader').style.display = 'none';
            }
          },
          // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
          // signInFlow: 'popup',
          // signInSuccessUrl: '<url-to-redirect-to-on-success>',
          signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            window.__firebase.auth.EmailAuthProvider.PROVIDER_ID
          ],
          // Terms of service url.
          tosUrl: "/terms-and-conditions",
          // Privacy policy url.
          privacyPolicyUrl: "/privacy-policy"
        };

        // The start method will wait until the DOM is loaded.
        return ui.start($this.authIuSelector, uiConfig);
      },
      onCloseEnd() {
          document.querySelector($this.authIuSelector).innerHTML = "";
        }
    };
    this.instances = window.M.Modal.init(elems, options);
  },
  data() {
    return {
      instances: [],
      authIuSelector: "#authentication-modal.modal .modal-content"
    };
  }
};

</script>

<style scoped>
</style>