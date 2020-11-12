<template>
<div>
  <div class="main container">
    <h3 id="introduction-to-media-bits" class="center">Introduction to <br />{{ $store.state.appName }}</h3>
    <p>{{ $store.state.appName }} is ...</p>
  </div>

  <FooterComponent />

  <ul id="documentation-table-of-contents" class="sidenav sidenav-fixed">
    <li v-for="(section, index) in sections" :key="'documentation-section' + index + 1"><a :href="'#' + section.href">{{ section.text }}</a></li>
  </ul>
</div>
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "documentation",
  components: {
    FooterComponent
  },
  data(){
    return {
      sections: [
        {
          href: "introduction-to-media-bits",
          text: "Introduction to Media-Bits"
        }
      ]
    }
  }
}
</script>

<style scoped>
.sidenav{
  height: calc(100% - 60px) !important;
  margin-top: 60px !important;
  z-index: 1;
  border-right: thin solid #009688 !important;
}

.main, footer {
  padding-left: 300px;
}

@media only screen and (max-width : 992px) {
  .main, footer {
    padding-left: 0px !important;
  }
  }
</style>