<template>
<div class="parent hide-on-med-and-down" @click="openDropdown()">
    <img width="40" height="40" style="cursor: pointer;" src="@/assets/img/user-circle.svg">
    &nbsp;
    <i class="fa fa-caret-down dropdown-trigger" data-target="user-view-on-desktop"></i>
    <ul class="dropdown-content white" id="user-view-on-desktop">
        <li><a class="bold primary-text disabled" style="display: flex; align-items: center; justify-content: flex-start; flex-direction: row;" disabled><img width="40" height="40" src="@/assets/img/user-circle.svg"> &nbsp; {{ $store.state.currentUser !== null ? $store.state.currentUser.displayName : 'Guest' }}</a></li>
        <li><a @click="sign" class="white-text primary waves-effect waves-light">{{ $store.state.currentUser === true ? 'Sign out' : 'Sign in / Sign up' }}</a></li>
    </ul>
</div> 
</template>

<script>
export default {
    name: "user-view-on-desktop",
    methods:{
        openDropdown(){
            return window.document.querySelector("[data-target=user-view-on-desktop]").click();
        },
        sign(){
            const catchError = error => window.M.toast({classes: "red bold rounded", html: `Error: ${error.message}`})

            const catchSuccess = mode => window.M.toast({html: `Signed ${mode} successfully`, classes: "primary rounded bold"})

            if(this.$store.state.currentUser) {
                return window.__firebase.auth().signOut().then(() => catchSuccess('in')).catch(catchError);
            } else {
                return window.__firebase.auth().signInWithPopup(new window.__firebase.auth.GoogleAuthProvider()).then(() => catchSuccess('out')).catch(catchError);
            }
        }
    }
}
</script>

<style scoped>
.parent{
    position: fixed;
    cursor: pointer !important;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-right: thin solid #fff;
    height: 60px;
    width: 60px;
}
.parent img{
    padding: 2px;
    border-radius: 100px;
    border: thin solid #fff;
}
</style>