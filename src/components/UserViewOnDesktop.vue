<template>
<div class="parent hide-on-med-and-down">
    <img width="40" height="40" style="cursor: pointer;" @click="openDropdown" src="@/assets/img/user-circle.svg">
    &nbsp;
    <i class="fa fa-caret-down dropdown-trigger" data-target="user-view-on-desktop"></i>
    <ul class="dropdown-content white" id="user-view-on-desktop">
        <li><a class="bold teal-text disabled" style="display: flex; align-items: center; justify-content: flex-start; flex-direction: row;" disabled><img width="40" height="40" src="@/assets/img/user-circle.svg"> &nbsp; {{ Boolean(currentUser) === true ? currentUser.displayName : 'Guest' }}</a></li>
        <li><a @click="sign" class="white-text teal waves-effect waves-light">{{ Boolean(currentUser) === true ? 'Sign out' : 'Sign in / Sign up' }}</a></li>
    </ul>
</div> 
</template>

<script>
export default {
    name: "user-view-on-desktop",
    data(){
        return {
            currentUser: window.__firebase.auth().currentUser,
            Boolean
        };
    },
    mounted(){
        this.currentUser = window.__firebase.auth().currentUser;
        setInterval(() => {
            this.currentUser = window.__firebase.auth().currentUser;
        }, 2000)
        
    },
    methods:{
        openDropdown(){
            document.querySelector("[data-target=user-view-on-desktop]").click()
        },
        sign(){
            if (!window.__firebase.auth().currentUser) return document.querySelector('#authentication-modal').M_Modal.open();

            else {
                window.M.toast({
                    html: "Signed out successfully",
                    classes: "teal bold rounded"
                });
                return window.__firebase.auth().signOut();
                }
        }
    }
}
</script>

<style scoped>
.parent{
    position: fixed;
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