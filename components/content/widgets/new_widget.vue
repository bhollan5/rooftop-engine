<template>
<!-- Popup shown when the gear button is clicked: -->
<div class="edit-element-interface">

  <!-- Input type selector: -->
  <div class="element-type-selector">
    <h5>Section type:</h5>
    <!-- v-for list of the section type options: -->
    <div class="element-type-option" v-for="widgetType in widgetTypes"
      :class="{'selected-element-type': 
        value.type == widgetType.type}"
      @click="update_data('type', widgetType.type)">
      <div class="element-type-icon"
      :class="{bold: widgetType.bold}">
        <image-icon v-if="widgetType.type == 'image'"></image-icon>
        <span v-else>{{widgetType.icon}}</span>
      </div>
      <div class="option-description">
        <p class="bold">{{widgetType.title}}</p>
        <p class="small-font">{{widgetType.description}}</p>
      </div>
    </div>
  </div>

  <div class="element-size-selector">
    <h5>Size:</h5>
  </div>

</div>
</template>

<script>

export default {

  props: {
    value: {
      type: Object
    },
    editable: {
      type: Boolean
    }
  },
  data() {
    return {
      // Storing data for different section types.
      // This is mostly just to save html space w/ a v-for
      widgetTypes: [
        {
          type: 'section-title',
          icon: '1.',
          bold: true,
          title: 'Section Title',
          description: 'Describes bigger sections.'
        },
        {
          type: 'subsection-title',
          icon: '1.1.',
          bold: true,
          title: 'Subsection Title',
          description: 'Segments ideas.'
        },
        {
          type: 'paragraph',
          icon: 'Aa',
          bold: true,
          title: 'Paragraph',
          description: 'For writing text.'
        },
        {
          type: 'image',
          icon: 'image-icon',
          bold: false,
          title: 'Image',
          description: 'Add an image!'
        },
        {
          type: 'collection',
          icon: 'col',
          bold: false,
          title: 'Collection',
          description: 'A collection of documents.'
        },
      ]
    }
  },
  methods: {

    update_data(field, new_val) {
      let data_update = JSON.parse(JSON.stringify(this.value));
      data_update[field] = new_val;
      this.$emit('input', data_update);
    }
  }
}

</script>

<style lang="scss">

// This is for the interface that pops up when you press the gear icon. 
.edit-element-interface {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  animation: fadein linear .2s;
  background: var(--card);
  z-index: 11;
  h5 {
    padding: 5px;
  }
}
@keyframes fadein {
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
}

</style>