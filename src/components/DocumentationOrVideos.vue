<template>
<div>
  <div v-for="topic in documentation" :key="topic.title" class="main">
    <div class="container">
      <h3 id="introduction-to-media-bits" class="center">{{ topic.title }}</h3>
      <p v-html="topic.body"></p>
    </div>
  </div>

  <FooterComponent />

  <ul id="documentation-table-of-contents" class="sidenav sidenav-fixed">
    <li v-for="(topic, index) in documentation" :key="'documentation-section' + index + 1"><a :href="topic.href">{{ topic.title }}</a></li>
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
  mounted(){
      
  },
  data(){
    return {
      documentation: []
    }
  },
  props: {
      role: {
          type: String,
          required: true
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