<template>
<!-- 

  ☞  This is the Viewer!
      |
      ├⇢ Represents our camera, viewing whatever the route indicates.
      |
      ├⇢ Our perspective is made of two parts: 
      |    1. The system we're accessing
      |    2. Our "focus" - the element of that system we're engaging with.
      |
      ├⇢ Load the url:
      |    rooftop-media.org / collection_id / doc_id / path/to/focus/el
      |
      ├⇢ To be "renderable", a document must reference an Element. 
      |
      └⇢ Pass the reference to the document's file into an Element tag, with props!

-->
<div id="viewer">
  <program/>
  <object/>
</div>
</template>

<script>
export default {
  name: 'bridge', // like from star trek

  data() {
    return {

      /* An array of strings for each element in the route.
           so '/projects/rooftop-website' will return ['projects', 'rooftop-website'] */
      route: this.$route.params.pathMatch.split('/'),

      data: [],


    }
  },
  
  computed: {
    
  },

  // Page kernel. 
  mounted() {
    console.log(this.route);
    // this.$store.dispatch('focus/page/load_route', this.route);
  }

}
</script>

<style lang="scss" scoped>
#viewer {
  height: 100%;
  width: 100%;
}
</style>