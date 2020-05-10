<template>
<card title="Draft Page Details">
  <text-field :value="data.name" title="Name"></text-field>
  {{elements}}
</card>
</template>

<script>
export default {
  name: 'page-detail-editor',
  data() {
    return {
      
    }
  },
  computed: {
    data() {
      let data = this.$store.getters['drafts/page/local_data'];
      return data;
    },
    elements() {
      let elements = this.$store.getters['drafts/page/elements'];
      return elements;
    },
  }
}
</script>