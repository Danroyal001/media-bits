<template>
<div>
  <div v-for="topic in documentation" :key="topic.title" class="main">
    <div :id="topic.href" class="container">
      <br />
      <br />
      <h4 class="center" :title="topic.title">{{ topic.title }}</h4>
      <p v-if="role === 'documentation'" v-html="topic.body"></p>
      <video v-else class="black" controls loop>
        <source :src="topic.videoURL">
      </video>
      <br />
      <hr />
    </div>
  </div>

  <FooterComponent />

  <ul id="documentation-table-of-contents" class="sidenav sidenav-fixed">
    <li v-for="(topic, index) in documentation" :key="'documentation-section' + index + 1"><a :href="'#' + topic.href" :title="topic.title" class="truncate">{{ topic.title }}</a></li>
  </ul>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FooterComponent from "@/components/FooterComponent.vue";

export default defineComponent({
  name: "documentation",
  components: {
    FooterComponent
  },
  mounted(){
      if (this.role === 'documentation'){
        import('@/assets/js/documentation').then(({ getOnlyDocumentation }) => {
        this.documentation = getOnlyDocumentation();
        });
      } else if (this.role === 'videos'){
        import('@/assets/js/documentation.js').then(({ getOnlyVideos }) => {
        this.documentation = getOnlyVideos();
        });
      }
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
});
</script>

<style scoped>
.sidenav{
  height: calc(100% - 60px) !important;
  margin-top: 60px !important;
  z-index: 1;
  border-right: thin solid #009688 !important;
}

.sidenav > li{
  height: auto !important;
}

.video{
  width: 100% !important;
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