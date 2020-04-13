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
      @click="emit_update([], 'type', widgetType.type)">
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

    // new update func:
    emit_update(path, new_index, new_val) {
      let new_path = path;
      new_path.unshift(new_index)
      this.$emit('input', {
        path: new_path,
        new_val: new_val,
      });
    },
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


// Section Type selector
.element-type-selector {
  width: 250px;
  overflow-y: scroll;
  height: 100%;
  border-right: solid 1px var(--card-text2);
  min-height: 100px;
}
// Each individual section type option, w/ icon:
.element-type-option {
  width: 100%;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  background: var(--card);
  cursor: pointer;
  .element-type-icon {
    width: 35px;
    height: 35px;
    border-radius: 5px;
    border: 1px solid var(--input-text2);
    background: var(--input);
    display: flex; 
    align-items: center;
    justify-content: space-around;
    svg {
      padding: 0px;
      fill: var(--input-text);
      width: var(--regular-font-size);
      height: var(--regular-font-size);
    }
  }
  .option-description {
    padding: 0px 10px;
    color: var(--card-text2);
    // Scooting the description closer to the label
    .bold {
      margin-bottom: -5px;
    }
  }

  &:hover {
    filter: brightness(130%);
    .option-description {
      color: var(--card-text);
    }
  }
  // For the currently selected element option:
  &.selected-element-type {
    filter: brightness(120%);
    color: var(--card-text);
    .option-description {
      color: var(--card-text);
    }
    .element-type-icon {
      border: 1px solid var(--input-text);
    }
  }
}

</style>