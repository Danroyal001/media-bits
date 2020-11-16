<template>
<div></div>
</template>

<script>
export default {
  name: "email-action-handler",
  mounted() {
    const $this = this;
    const $query = $this.$route.query;

    // Get the action to complete.
    const mode = $query.mode;
    // Get the one-time code from the query parameter.
    const actionCode = $query.oobCode;
    // (Optional) Get the continue URL from the query parameter if available.
    const continueUrl = $query.continueUrl;
    // (Optional) Get the language code if available.
    const lang = $query.lang || "en";

    const auth = window.__firebase.auth();

    // Handle the user management action.
    switch (mode) {
      case "resetPassword":
        // Display reset password handler and UI.
        $this.handleResetPassword(auth, actionCode, continueUrl, lang);
        break;
      case "recoverEmail":
        // Display email recovery handler and UI.
        $this.handleRecoverEmail(auth, actionCode, lang);
        break;
      case "verifyEmail":
        // Display email verification handler and UI.
        $this.handleVerifyEmail(auth, actionCode, continueUrl, lang);
        break;
      default:
        (() => {
            alert("Invalid Email Action");
            return window.$router.push("/");
            })();
    }
  },
  methods: {
      handleResetPassword(auth, actionCode, continueUrl, lang) {
          const $this = this;
  // Localize the UI to the selected language as determined by the lang
  // parameter.
  var accountEmail;
  // Verify the password reset code is valid.
  auth.verifyPasswordResetCode(actionCode).then(email => {
    accountEmail = email;

    // TODO: Show the reset screen with the user's email and ask the user for
    // the new password.

    // Save the new password.
    auth.confirmPasswordReset(actionCode, newPassword).then(() => {

      auth.signInWithEmailAndPassword(accountEmail, newPassword).then(() => {
          if (continueUrl) return $this.$router.push(continueUrl);
      });

    }).catch(_error => {
      // Error occurred during confirmation. The code might have expired or the
      // password is too weak.
      return $this.$$router.push("/");
    });
  }).catch(_error => {
    // Invalid or expired action code. Ask user to try to reset the password
    // again.
    return $this.$$router.push("/");
  });
},
handleRecoverEmail(auth, actionCode, lang) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.
  var restoredEmail = null;
  // Confirm the action code is valid.
  auth.checkActionCode(actionCode).then(function(info) {
    // Get the restored email address.
    restoredEmail = info['data']['email'];

    // Revert to the old email.
    return auth.applyActionCode(actionCode);
  }).then(function() {
    // Account email reverted to restoredEmail

    // TODO: Display a confirmation message to the user.

    // You might also want to give the user the option to reset their password
    // in case the account was compromised:
    auth.sendPasswordResetEmail(restoredEmail).then(function() {
      // Password reset confirmation sent. Ask user to check their email.
    }).catch(function(error) {
      // Error encountered while sending password reset code.
    });
  }).catch(function(error) {
    // Invalid code.
  });
},
handleVerifyEmail(auth, actionCode, continueUrl, lang) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.
  // Try to apply the email verification code.
  auth.applyActionCode(actionCode).then(function(resp) {
    // Email address has been verified.

    // TODO: Display a confirmation message to the user.
    // You could also provide the user with a link back to the app.

    // TODO: If a continue URL is available, display a button which on
    // click redirects the user back to the app via continueUrl with
    // additional state determined from that URL's parameters.
  }).catch(function(error) {
    // Code is invalid or expired. Ask the user to verify their email address
    // again.
  });
}
  }
};

</script>

<style>

</style>