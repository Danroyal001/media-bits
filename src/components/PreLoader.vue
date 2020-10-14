<template>
  <div class="parent" style="width: 100% !important; height: 100% !important;">
    <div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-green-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
    name: 'PreLoader'
}
</script>

<style scoped>
.parent{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>