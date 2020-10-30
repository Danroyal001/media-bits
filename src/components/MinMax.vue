<template>
    <div class="minmax-group">
        <a onclick="window.minimize()" class="teal minmax waves-effect waves-light"><i class="fa fa-window-minimize"></i></a>
        <a onclick="window.maximize()" class="teal minmax waves-effect waves-light"><i class="fa fa-window-maximize"></i></a>
        <a onclick="window.close()" class="minmax waves-effect waves-light red"><i class="fa fa-window-close"></i></a>
    </div>
</template>

<script>
export default {
    name: 'min-max'
}
</script>

<style>
.minmax-group{
    /*display: inline;*/
    position: fixed !important;
    right: 0px !important;
    top: -5px !important;
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
}
</style>