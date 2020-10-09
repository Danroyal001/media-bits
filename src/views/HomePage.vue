<template>
<div>
<!-- Root -->

<!-- Begin carousel -->
  <div class="carousel carousel-slider center black-text">

    <div class="carousel-fixed-item center">
      <router-link to="/editor" class="btn waves-effect waves-light teal white-text">GET STARTED</router-link>
    </div>

    <div class="carousel-item">
      <img src="@/assets/img/1.jpg">
    </div>

    <div class="carousel-item">
      <img src="@/assets/img/2.jpg">
    </div>

    <div class="carousel-item">
      <img src="@/assets/img/3.jpg">
    </div>

    <div class="carousel-item">
      <img src="@/assets/img/4.jpg">
    </div>

    <div class="carousel-item">
      <img src="@/assets/img/5.jpg">
    </div>

  </div>
  <!-- End Carousel -->

  <div class="container">
    <br />
    <OTPButton />
  </div>
<!-- Root -->
</div>
</template>

<script>
import OTPButton from '@/components/OTPButton.vue';

export default {
  name: 'HomePage',
  components: {
    OTPButton
  },
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

    var elems = document.querySelectorAll('.carousel');
     this.carouselInstance = window.M.Carousel.init(elems, {
       fullWidth:true,
       indicators:true,
       dist: -100,
      //  numVisible: 3
     });

     setInterval(() => this.carouselInstance[0].next(), 3500);
  }
}
</script>

<style>

</style>