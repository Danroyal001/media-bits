<template>
    <div class="minmax-group">
        <a title="minimize" onclick="window.minimize()" class="primary minmax waves-effect waves-light"><i class="fa fa-window-minimize"></i></a>
        <a title="maximize/restore" onclick="window.maximize()" class="primary minmax waves-effect waves-light"><i class="fa fa-window-maximize"></i></a>
        <a title="quit/exit" onclick="window.close()" class="minmax waves-effect waves-light red"><i class="fa fa-window-close"></i></a>
    </div>
</template>

<script>
export default {
    name: 'min-max'
}
</script>

<style scoped>
.minmax-group{
    /*display: inline;*/
    position: fixed !important;
    right: 0px !important;
    top: -10px !important;
    margin: 0px !important;
    padding: 0px !important;
    font-size: 11px !important;
}
.minmax{
    padding: .5px !important;
    margin: 0px !important;
    display: inline-block;
    width: 45px;
    text-align: center;
    height: 50% !important;
    border-left: .1px solid white;
    top: 0;
    -webkit-app-region: no-drag;
}
.minmax:hover{
    background: linear-gradient(to right bottom, #5b53ff 65%, #ffffff);
}
</style>