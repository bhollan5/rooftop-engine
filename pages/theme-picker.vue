<template>
  <div class="page-content">
    <h1 id="theming-header">Dynamic Theming</h1>
    <h2>Customize Rooftop's theme here!</h2>
    <p class="centered">Below, you can try out different options to build your own theme for Rooftop.</p>
    
    <div class="big-br"></div><div class="big-br"></div>

    <!-- In the "customizer" div, we use temporary styling. -->
    <div id="customizer" :style="{background: bg}">

      <div id="logo-and-text" class="flex-container">
        <div class="theme-options">
          --logo:<input type="color" v-model="logo"><br><br>

          --bg:<input type="color" v-model="bg"><br>
          --bg-text:<input type="color" v-model="bg_text"><br>
          --bg-text2:<input type="color" v-model="bg_text2"><br>
        </div>
        <div class="theme-example" :style="{color: bg_text}">
          <logo></logo>
          <h1 :style="{color: bg_text}">Page Title!</h1>
          <h2 :style="{color: bg_text2}">Subtitle, in secondary color</h2>
          <p>Totally regular text that would appear in the body of a paragraph on a page on  the website. Hi!</p><br>
          <p>Important parts of a text passage might be highlighted to show importance. </p><br>
          <p>Here's a link to another page →</p>
        </div>
    </div>

    </div>

  </div>
</template>

<script>
import logo from '~/components/logo.vue';


// Our vue component
export default {
  data() {
    return {
      logo: this.$store.state.logo,
      bg: this.$store.state.bg,
      bg_text: this.$store.state.bg_text,
      bg_text2: this.$store.state.bg_text2,
    }
  },
  components: {
    logo
  }
}
</script>

<style lang="scss">
#theming-header {
  padding-top: 50px;
  padding-bottom: 0px;
}
h2 {
  text-align: center;
  color: var(--bg-text2);
}

#customizer {
  padding-top: 50px;
}

#logo-and-text {
  justify-content: space-around;
  margin-top: 100px;
}

.theme-options, .theme-example {
  max-width: 500px;
}


</style>

