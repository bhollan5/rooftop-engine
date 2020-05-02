<template>
<div>

  <table-widget :value="loaded_collections" 
    :columns="columns"
    @rowclick="$router.push('/' + collection + '/' + $event)"
  ></table-widget>
  <button class="card-button margins" @click="load_all()">Load all {{collection}}s</button>
  <div class="secondary small-font margins">
    Fields: <span v-for="(value,key) in loaded_collections[0]">{{key}}, </span>
  </div>
</div>
</template>

<script>
import tableWidget from '@/components/widgets/table-widget.vue';

export default {

  props: {
    // The title for the table. Ex: "All Projects"
    title: String,
    // Singular version of the collection name. Ex: "project"
    collection: String,
    // Which columns to show.
    columns: Array

  },

  data() {
    return {

      database_collections: ['project', 'article', 'user', 'collection']
    }
  },
  components: {
    tableWidget,
  },
  computed: {
    loaded_collections() {
      // Ex: if collection == 'project', this will get 'projects/all_collections'.
      let getter_string = this.collection + 's/all_' + this.collection + 's'; 
      return this.$store.getters[getter_string];
    }
  },
  mounted() {
  },
  methods: {
    load_all() {
      this.$store.dispatch(this.collection + 's/read_' + this.collection + 's', {})
    },
  }
}
</script>