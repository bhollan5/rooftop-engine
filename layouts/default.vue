<template>
<!-- 

  ☞  This file is the frame for pages/_.vue. 
      |
      ├⇢ Represents the user's POV & controls. 
      |
      └⇢ Loaded from store/cpu.

-->
<div id="page"
  @mousemove="mouse_move($event)"
  @mousedown="mouse_down($event)"
  @mouseup="mouse_up($event)">

  <div class="debug">

    <!-- Input: -->
    <div class="set" id="input">
      <u>Input lines:</u><br><br>
      <div v-for="line in input" >
        {{line}}
      </div>
    </div>

    <!-- Dictionary -->
    <div class="set" id="dictionary">
      <u>Dictionary:</u><br><br>
      <div v-for="tuple in dictionary" >
        i: {{tuple[0]}}<br>
        o: {{tuple[1]}}<br>
      </div>
    </div>

    <!-- Outputs -->
    <div class="set" id="storage">
      <u>Storage:</u><br><br>
      <div v-for="item in storage" >
        ${{item}}
      </div>
    </div>

    <!-- Display -->
    <div class="set" id="display">
      <u>Display:</u><br><br>
      <div v-for="line in display" >
        {{line}}
      </div>
    </div>

  </div>
  

  <nuxt />

</div>
</template>

<script>

export default {
  name: 'viewer',

  components: {
  },
  data() {
    return {
      
    }
  },
  computed: {
    input() {
      return this.$store.getters['programs/input'];
    },

    dictionary() {
      return this.$store.getters['programs/dictionary'];
    },
    storage() {
      return this.$store.getters['programs/storage'];
    },

    display() {
      return this.$store.getters['programs/display'];
    },
  },
  
  mounted() {
    document.addEventListener("keydown", this.key_down);
    this.$store.dispatch('programs/run_line', 0);
  },

  watch: {
    
  },
  methods: {

    /* INPUT OBSERVERS: */
    mouse_move(event) {
      // console.log("Mouse moved: ")
      // console.log(event)
    },
    mouse_down(event) {
      // console.log("Mouse down:")
      // console.log(event)
    },
    mouse_up(event) {
      // console.log("Mouse up:")
      // console.log(event)
    },
    key_down(event) {
      console.log("Key down:")
      console.log(event)
      this.$store.dispatch('programs/input', 'keydown[' + event.key + ']')
    }
  }
}
</script>

<style lang="scss">

// @import '@/styles/globals.scss';
#page {
  height: 100%;
  min-height: 100vh;
  width: 100%;
  // background: #011223;
  background: url("../assets/images/desert.png");
  background-size: cover;
  color: white;
  font-family: inconsolata;
}
html, body {
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
}

.debug {
  display: flex;
  text-shadow: 0px 0px 5px black;
}
.set {
  margin-right: 10px;
  padding: 3px;
  width: 200px;
  overflow: scroll;
  background: rgba(0,0,0,.4);
}

.flex {
  display: flex;
}

.space-between {
  justify-content: space-between;
}

#the-header-bar {
  height: 70px;
  position: absolute;
}

#header-bar-logo {
  margin-top: 10px;
  margin-left: 10px;
  height: 50px;
  --logo: pink;
}

</style>
