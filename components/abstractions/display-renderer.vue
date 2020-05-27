<template>
<!-- 
  ☞  This is our Element component! 
      │
      ├⇢ Pass in an element_id
      │    because it requires
      │
      └⇢ Objects are a type of Element. 

     Features:
      ├⇢ Reference a set of Element objects. 
      │
      ├⇢ Renders those Elements
      └⇢

  Functions:
   >  Router logic,
   >  Page data, 
   >  Rendering the root container element

   About the <component> tags:
   https://vuejs.org/v2/guide/components-dynamic-async.html

-->
<div class="text">
  {{ text_content }}
</div>

</template>

<script>

export default {
  name: 'some-text',

  computed: {
    text_content() {
      return 'hi!';
    },

  }
}

</script>