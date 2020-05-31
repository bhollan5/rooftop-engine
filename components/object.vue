<template>
<component class="object"
  is="inline-text"

/>
</div>
</template>

<script>
// 
export default {
  name: 'object-renderer', 


  
  props: {

    file_id: {          /*        - ⌾ Object File ID ⌾ -              */
      type: String,     /*   Used to reference this object's file,    */
    },                  /*      which should fill out the             */
                        /*     requirements of its prototype.         */

    filetype_id: {     /*         - ⌾ Filetype ID ⌾ -               */
      type: String,     /*   This corresponds to a file in our        */
    },                  /*    vocab, which should tell us this        */
                        /*    object's component requirements.        */
  },

  computed: {

    /*  Returns a File / Definition.  */
    filetype() {
      let prototype = this.$store.getters['vocab/object'](this.prototype_id);
      if (!prototype) {
        console.warn(" ⍀ Couldn't find a prototype with the id: " + this.prototype_id);
        return null;
      } else {
        return prototype
      }
    },

    /*   Returns an "Object" type File.    */
    file() {
      let object = this.$store.getters['files/object'](this.object_id);
      if (!prototype) {
        console.warn(" ⍀ Couldn't find a prototype with the id: " + this.prototype_id);
        return null;
      } else {
        return prototype
      }
    },

  },

}

</script>

<style lang="scss">

</style>