<template>
<!-- Generic object editor component. Use:
  
  <object-editor 
    :object="my_object" 
    @input="handle_update($event)">
  </object-editor>

 -->
<div style="display: flex; flex-flow: row wrap;justify-content:space-between;">
  <div v-for="(value, field) in object" class="object-editor-field">
    <text-field :key="field"
      v-if="typeof(value) == 'string'"
      :title="field + ':'" 
      :value="value"
      nopadding
      @input="update_field($event, field)">
    </text-field>
    <div v-else>{{field}} : {{value}}</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'object-editor',
  props: {
    object: Object
  },
  methods: {
    update_field(value, field) {
      let update_obj = {};
      update_obj[field] = value;
      this.$emit('input', update_obj)
    }
  }
}
</script>

<style lang="scss">
.object-editor-field {
  width: 45%;
}
</style>