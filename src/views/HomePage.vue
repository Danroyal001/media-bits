<template>
<div>
<!-- Root -->
  <div class="carousel carousel-slider center black-text">

    <div class="carousel-fixed-item center">
      <a class="btn waves-effect waves-light teal white-text">GET STARTED</a>
    </div>
<!-- bookmark -->
    <div id="carouselItem1" class="carousel-item">
      <img src="@/assets/img/1.jpg">
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
    // document.querySelector('#carouselItem1').style.background = 'url(@/assets/img/2.jpg)';

    var elems = document.querySelectorAll('.carousel');
     this.carouselInstance = M.Carousel.init(elems, {
       fullWidth:true,
       indicators:true,
       dist: -100,
      //  numVisible: 3
     });

     setInterval(() => this.carouselInstance[0].next(), 5000);
  }
}
</script>

<style>
.position-absolute{
  position: absolute !important;
}
</style>