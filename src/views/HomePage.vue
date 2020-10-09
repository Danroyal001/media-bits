<template>
<div>
<!-- Root -->
  <div class="carousel carousel-slider center black-text">

    <div class="carousel-fixed-item center">
      <a class="btn waves-effect waves-light teal white-text">GET STARTED</a>
    </div>

    <div class="carousel-item" style="background: url(@/assets/img/2.jpg) !important">
      <h2>Panel</h2>
      <p>This is a panel 1</p>
    </div>

    <div class="carousel-item">
      <h2>Panel</h2>
      <p>This is a panel 2</p>
    </div>

    <div class="carousel-item">
      <h2>Panel</h2>
      <p>This is a panel</p>
    </div>

    <div class="carousel-item">
      <h2>Panel</h2>
      <p>This is a panel</p>
    </div>

    <div class="carousel-item">
      <h2>Panel</h2>
      <p>This is a panel</p>
    </div>

  </div>
<!-- Root -->
</div>
</template>

<script>
import * as M from '@/assets/js/materialize.js';

export default {
  name: 'HomePage',
  data(){
    return {
      carouselInstance: {}
    }
  },
  created(){
    // this.carouselInstance = M.Carousel.getInstance(document.querySelector('.carousel'));
    // setInterval(() => this.carouselInstance.next(), 3000)
  },
  mounted(){
    // return M.AutoInit();
    var elems = document.querySelectorAll('.carousel');
     this.carouselInstance = M.Carousel.init(elems, {
       fullWidth:true,
       indicators:true
     });

     setInterval(() => this.carouselInstance[0].next(), 5000);
  }
}
</script>

<style>
</style>