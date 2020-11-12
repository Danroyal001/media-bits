<template>
<div>
    <div class="container">
    <br />
    <h3 class="teal white-text center p-8px">Download <wbr />{{ $store.state.appName }} App</h3>
    <br />
    <p class="center bold">Download free trial and upgrade later by signing in</p>
    <br />

    <div class="row center">
        <div class="container col s12 download-link waves-effect waves-dark">
            <a class="teal-text bold"><span>DOWNLOAD FOR WINDOWS</span> <img src="@/assets/img/windowslogo.jpg"></a>
        </div>
    </div>

    <div class="row center">
         <div class="container col s12 m6 l6 download-link waves-effect waves-dark">
            <a class="teal-text bold"><span>DOWNLOAD FOR MAC OSX</span> <img src="@/assets/img/maclogo.jpg"></a>
        </div>

        <div class="container col s12 m6 l6 download-link waves-effect waves-dark">
            <a class="teal-text bold"><span>DOWNLOAD FOR LINUX</span> <img src="@/assets/img/linuxlogo.jpg"></a>
        </div>
    </div>

    <div class="row center">
        <div class="container col s12 m6 l6 download-link waves-effect waves-dark">
            <a class="teal-text bold"><span>DOWNLOAD FOR IPHONE / IPAD</span> <img src="@/assets/img/apple-app-store.png"></a>
        </div>

        <div class="container col s12 m6 l6 download-link waves-effect waves-dark">
            <a class="teal-text bold"><span>DOWNLOAD FOR ANDROID</span> <img width="198" height="62" src="@/assets/img/google-play-store-logo.png"></a>
        </div>
    </div>

    <br />
    <hr />
    <div class="center">OR</div>
    <hr />
    <br />

    <div class="row center">
        <div class="container col s12 download-link waves-effect waves-dark">
            <router-link to="/editor" class="teal-text bold"><span>USE THE WEB APP</span> <img src="@/assets/img/chromium.png"></router-link>
        </div>
    </div>

</div>

<hr />

<div class="container">
    <br />
    <h3 class="teal white-text center p-8px">version history</h3>
    <br />
    <table class="table-responsive highlight striped">
        <thead>
          <tr>
              <th>Version</th>
              <th>Release Date</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1.0.0</td>
            <td>dd/mm/yyyy</td>
          </tr>
        </tbody>
    </table>
<br />
</div>

<FooterComponent />
</div>
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";

export default {
    name: 'download-page',
    components: {
        FooterComponent
    }
}
</script>

<style>
.download-link{
    margin-top: 8px;
    margin-bottom: 8px;
}

.download-link a{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 4px;
    border: thin solid #009688;
}
</style>