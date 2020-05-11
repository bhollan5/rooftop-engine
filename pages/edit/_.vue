<template>
<!-- The 'content' is the body, side bar, and footer. -->
<the-content>

  <!--                                                                      -->
  <!-- First up: The side bar, which pops up from the left when it's shown! -->
  <!--                                                                      -->
  <template #sidebar>
    <page-details/>
  </template>

  
  <!-- Floating top left icons: -->
  <template #floatingicons>
    <!-- Save the document:     -->
    <div @click="save()">
      <save-icon :class="{ 'disabled': saving || !unsaved_changes }">
      </save-icon>
    </div>
  </template>  <!-- End floating icons -->

  <!-- Content body: -->
  <template #body>
    <page-renderer></page-renderer>
  </template><!-- End body -->

  <!-- Footer: -->
  <template #footer>
  </template>

  

</the-content>
</template>

<script>


export default {
  name: 'view-layout',

  components: {
  },

  data() {
    return {
      // - Local page data: - 
      route: this.$route.params.pathMatch.split('/'),

      // key shortcut stuff:
      keys: {
        command: false,
      },


      // Show footer:
      footer_height: 0,
      show_side_bar: true,

      // This will hold the collection of the document we're looking at
      collection_name: '',
      // And the id of that document:
      doc_id: '',

      selected_element: -1,   // The index of the currently selected el.
      edit_template: false,   // Whether we have the template editor open

      // If the document has unsaved changes
      unsaved_changes: false,
      // True while saving:
      saving: false,
    }
  },

  

  computed: {

  },

  mounted() {
  },

  destroyed() {
  },

  methods: {
    save() {

    }
  }
}
</script>

<style lang="scss">


.body-floating-icons, .footer-floating-icons {
  position: sticky;
  width: 30px;
  padding-left: 10px;
  padding-top: 10px;
  svg {
    fill: var(--bg-text2);
    --icon: var(--bg-text2);
    cursor: pointer;
    &:hover:not(.disabled) {
      fill: var(--bg-text);
      --icon: var(--bg-text);
    }
  }
}
.body-floating-icons {
  left: 10px;
  top: 0px;
}
.footer-floating-icons {
  left: 10px;
  transition-duration: .1s;
}
.body {
  position: relative;
}

.footer {
  position: fixed;
  font-size: var(--small-font-size);
  width: 100%;
  bottom: 0px;
  height: 100px;
  background: var(--card2);
  z-index: 50;
}
.disabled {
  opacity: .5;
}
.body-container {
  position: relative;
  width: 100%;
}

</style>