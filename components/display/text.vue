<template>
<!-- 
  ☞  This is our Text component!
      ├⇢ Props:
      │   ├⇢ tag: 'span'
      │   ├⇢ text: String
      │   └⇢ typography: Typography
      │
      └⇢ It is a "terminal", meaning it renders HTML tags directly. 

-->
<span class="text">
  {{ text_content }}
</span>

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