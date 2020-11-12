<template>
<!-- begin footer -->
   <footer class="page-footer teal">
          <div class="container">
            <div class="row">
              <div class="col l3 m6 s12">
                <h5 class="white-text"><img src="@/assets/img/logo.png" height="20">Media-Bits&trade;</h5>
                <ul>
                  <li><router-link class="grey-text text-lighten-3" to="/download">Download</router-link></li>
                  <li><a class="grey-text text-lighten-3" :target="window.isElectron ? false : '_blank'" :href="window.isElectron ? 'javascript:window.electron.shell.openExternal(\'https://daniel-effiong.web.app/#/projects\')' : 'https://daniel-effiong.web.app/#/projects'">Related softwares</a></li>
                </ul>
              </div>

              <div class="col l3 m6 s12">
                <h5 class="white-text">Get Support</h5>
                <ul>
                  <li v-for="(link, index) in footerLinks.getSupportLinks" :key="index"><router-link :to="link.href" class="grey-text text-lighten-3">{{ link.text }}</router-link></li>
                </ul>
              </div>

              <div class="col l3 m6 s12">
                <h5 class="white-text">Relevant Links</h5>
                <ul>
                  <li v-for="(link, index) in footerLinks.relevantLinks" :key="index"><router-link :to="link.href" class="grey-text text-lighten-3">{{ link.text }}</router-link></li>
                </ul>
              </div>

              <div class="col l3 m6 s12">
                <h5 class="white-text">Social Handles</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3"><i class="fa fa-facebook"></i>Facebook</a></li>
                  <li><a class="grey-text text-lighten-3"><i class="fa fa-twitter"></i>Twitter</a></li>
                  <li><a class="grey-text text-lighten-3"><i class="fa fa-instagram"></i>Instagram</a></li>
                  <li><a class="grey-text text-lighten-3"><i class="fa fa-youtube"></i>You Tube</a></li>
                  <br />
                  <li><a class="grey-text text-lighten-3" href="https://www.streamingmascotsalliance.com"><img src="@/assets/img/streamingmascots.png"></a></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="footer-copyright">
            <div class="container">
            &copy; {{ $store.state.year }} Copyright - {{ $store.state.appName }}
            <a class="grey-text text-lighten-4 right" :href="window.isElectron ? 'javascript:window.shell.openExternal(\'https://daniel-effiong.web.app\')' : 'https://daniel-effiong.web.app'">Propriety software of Daniel Effiong</a>
            </div>
          </div>
        </footer>
<!-- #end footer -->
</template>

<script>
export default {
  name: "footer-component",
  data() {
    return {
      window,
      footerLinks: {
        getSupportLinks: [
          {
            text: "Subscribtion",
            href: "/subscribtion"
          },
          {
            text: "Documentation",
            href: "/documentation"
          },
          {
            text: "Tutorial Videos",
            href: "/tutorial-videos"
          },
          {
            text: "Forum",
            href: "/forum"
          },
          {
            text: "Premium Support",
            href: "/premium-support"
          },
          {
            text: "Email Support",
            href: "/email-support"
          }
        ],
        relevantLinks: [
          {
            text: "Contact Us",
            href: "/contact"
          },
          {
            text: "Term & Conditions",
            href: "/terms-and-conditions"
          },
          {
            text: "Privacy Policy",
            href: "/privacy-policy"
          }
        ]
      }
    };
  }
};

</script>

<style>

</style>