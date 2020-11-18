<template>
<div>
    <br />
    <br />

    <table class="table-responsive highlight striped container">
        <caption class="bold">PRICING TABLE</caption>
        <thead>
          <tr>
              <th>Feature</th>
              <th>Daily Subscribtion (Per use)</th>
              <th>Monthly Subscribtion</th>
              <th>Yearly Subscribtion</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>vjyg</td>
            <td>tvhtjg</td>
            <td>jghjh</td>
            <td>chthh</td>
          </tr>
        </tbody>
    </table>

    <br />
    <br />
    <FooterComponent />
</div>
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";

export default {
    name: 'subscribtion',
    components: {
      FooterComponent
    }
}
</script>

<style>
caption{
    font-size: 40px;
}
</style>