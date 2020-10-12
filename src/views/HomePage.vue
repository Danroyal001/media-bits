<template>
<div class='home-page-root'>
<!-- Root -->

<!-- Begin carousel -->
  <div class="carousel carousel-slider center black-text">

    <div class="carousel-fixed-item center">
      <router-link to="/editor" class="btn waves-effect waves-light teal white-text">GET STARTED</router-link>
    </div>

    <div v-for="x in 4" :key="x" class="carousel-item">
      <img src="@/assets/img/1.png">
    </div>

  </div>
  <!-- End Carousel -->
<!-- Root -->
</div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    logData($event){
      console.log($event);
    }
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