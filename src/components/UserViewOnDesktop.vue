<template>
<div class="parent hide-on-med-and-down">
    <img width="40" height="40" style="cursor: pointer;" @click="openDropdown" src="@/assets/img/user-circle.svg">
    &nbsp;
    <i class="fa fa-caret-down dropdown-trigger" data-target="user-view-on-desktop"></i>
    <ul class="dropdown-content white" id="user-view-on-desktop">
        <li><a class="bold teal-text disabled" style="display: flex; align-items: center; justify-content: flex-start; flex-direction: row;" disabled><img width="40" height="40" src="@/assets/img/user-circle.svg"> &nbsp; Guest</a></li>
        <li><a class="white-text teal waves-effect waves-light">Sign In / Sign Up</a></li>
    </ul>
</div>
</template>

<script>
export default {
    name: "user-view-on-desktop",
    methods:{
        openDropdown(){
            document.querySelector("[data-target=user-view-on-desktop]").click()
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