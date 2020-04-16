<template>
<div class="form-field-container">
  <div class="form-field" v-for="field in form_fields">
    <text-field v-model="field.value"
    :placeholder="field.placeholder"
    :password="field.password"
    fontsize="regular"
    :required="field.required"
    :title="field.title"></text-field>
  </div>
  <br>
  <alert type="danger"></alert>
  <button @click="submit()">{{button.title}}</button>
</div>
</template>

<script>
export default {
  data() {
    return {
      form_fields: [],
    }
  },
  mounted() {
    this.form_fields = JSON.parse(JSON.stringify(this.fields));
  },
  props: {
    fields: Array,
    button: Object,
  },
  methods: {
    submit() {

      // validation
      let is_valid = true;
      this.form_fields.forEach((field) => {
        if (field.required && !field.value) {
          let msg = field.title + " required!";
          this.$store.commit('error', msg);
          is_valid = false;
        }
      })

      if (is_valid) {
        // sending data
        let data = {}
        this.form_fields.forEach((field) => {
          data[field.key] = field.value;
        });
        this.$emit('submit', data);
      }
    }
  }
}
</script>

<style lang="scss">

</style>