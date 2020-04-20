<template>
<!-- Dynamic card widgets for different modes: -->
<card title="Edit widget fields:" v-if="body_data && body_data[selected_widget]">
  <text-field v-for="(value, field) in body_data[selected_widget]" 
    :key="field"
    v-if="typeof(value) == 'string'"
    :title="field + ':'" 
    :value="body_data[selected_widget][field]"
    @input="update_widget_data(field, $event)">
  </text-field>
  <br>
  <text-field title="New field name" v-model="new_field_name"></text-field>
  <button @click="update_widget_data(new_field_name, '')">Add Field</button>
</card>
</template>

<script>
export default {

}
</script>

<style lang="scss">

</style>