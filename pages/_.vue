<template>
<div class="content">
  <side-bar :title="route[0] + '/' + route[1]">
  
    <card title="Document data">
      <p class="small-font">{{document}}</p>
    </card>

  </side-bar>

  <page-body v-model="document.data" v-if="document" :editable="true" @widgetselect="selected_widget = $event"
  owner="project_id">

  </page-body>
</div>
</template>

<script>
import pageBody from '~/components/body/page_body.vue';


export default {
  name: 'page-render',

  data() {
    return {

      // An array of strings for each element in the route.
      // So '/projects/rooftop-website' will return ['projects', 'rooftop-website']
      route: this.$route.params.pathMatch.split('/'),

      // This will hold the collection of the document we're looking at
      collection_name: '',
      // And the id of that document:
      doc_id: '',

      selected_widget: false,

    }
  },

  components: {
    pageBody,
  },

  computed: {
    // Pulling the document from the VueX store corresponding to it's collection:
    document() {
      if (this.collection_name && this.doc_id) {
        if (this.collection_name == 'project' || this.collection_name == 'article') {
          // Ex: if collection_name == 'project', this calls the getter "projects/project_query"
          let getter_name = this.collection_name + 's/' + this.collection_name + '_query';
          let query_result = this.$store.getters[getter_name]('_id', this.doc_id);
          return query_result[0];
        }
      }
      return {};
    },

  },

  created() {

    //   - - - Route handling: - - -
    // If there's an even number of elements in the route, we're looking at a document.
    if (this.route.length % 2 == 0) {
      this.collection_name = this.route[this.route.length - 2];
      this.doc_id = this.route[this.route.length - 1];
      this.load_page()

    // If there's an odd number of elements in the route, we're looking at a collection. 
    } else {
      this.collection_name = this.route[this.route.length - 1];
    }

  },
  methods: {

    load_page() {

      // Getting the document from the DB.
      //  So, if collection_name == 'project', this will dispatch "projects/read_project""
      this.$store.dispatch(this.collection_name + "s/read_" + this.collection_name, 
      { _id: this.doc_id }).then(() => {

      })

    },

  }
}
</script>