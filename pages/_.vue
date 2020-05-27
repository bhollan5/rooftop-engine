<template>
<!-- 

  ☞  This is the Page Renderer!
      |
      ├⇢ Represents our camera to the objective world, at a given location.
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
<div id="page-renderer">
  <component is="p">
  
  </component>
</div>
</template>

<script>
export default {
  name: 'perspective-of-the-world',

  data() {
    return {

      /* An array of strings for each element in the route.
           so '/projects/rooftop-website' will return ['projects', 'rooftop-website'] */
      route: this.$route.params.pathMatch.split('/'),

    }
  },
  
  computed: {
    
  },

  // Page kernel. 
  mounted() {
    console.log(this.route);
    this.$store.dispatch('focus/page/load_route', this.route);
  }

}
</script>

<style lang="scss" scoped>

</style>