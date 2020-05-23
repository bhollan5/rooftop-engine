<template>
<div class="cli-container">

  <div class="cli-line" v-for="line in lines">
    <div class="cli-text">{{line}} </div>
  </div>

  <div class="cli-line">
    <div class="cli-text">
      guest@~/dustzone$
    </div>

    <input v-model="draft_line" autofocus 
      @keyup.enter="enter()">
  </div>
  
</div>
</template>

<script>
export default {
  name: 'CLI', 

  data() {
    return {

      draft_line: 'create entity_type',   // For the text that's currently being typed. 

    }
  },

  computed: {
    input_mode() {
      return this.$store.getters['here/objects/cli/input_mode'];
    },
    lines() {
      return this.$store.getters['here/objects/cli/lines'];
    }
  },

  methods: {

    enter() {
      if (this.input_mode) {
        this.enter_input();
      } else {
        this.add_line();
      }
    },

    // Adds the currently drafted line, then clears the drafts. 
    enter_input() {
      this.$store.dispatch(                        // Runs the current line. 
        'here/objects/cli/enter_input', 
        this.draft_line
      );         
      this.draft_line = '';               // Clears the line (this doesn't wait for the dispatch to finish.)

    },

    // Adds the currently drafted line, then clears the drafts. 
    add_line() {
      this.$store.dispatch(                        // Runs the current line. 
        'here/objects/cli/run_command', 
        this.draft_line
      );         
      this.draft_line = '';               // Clears the line (this doesn't wait for the dispatch to finish.)

    },

  },

}
</script>

<style lang="scss">


.cli-container {
  padding: 15px;
  font-family: Inconsolata;
  font-size: 18px;
  input {
    font-family: Inconsolata;
    font-size: 18px;
  }
}

.cli-line {
  display: flex;
}

input, .cli-text {

  padding: 2px;
  background: none;

  border: none;
  color: hsl(0,0%, 50%);
  border-bottom: solid 0px hsl(0,0%, 50%);
  outline: none;
  transition-duration: .2s;

  &:focus {
    color: hsl(0,0%, 30%);
    border-bottom: solid 2px hsl(0,0%, 70%);
  }

}
</style>