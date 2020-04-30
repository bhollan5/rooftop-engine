<template>
<!-- Popup shown when the gear button is clicked: -->
<div id="element-editor">

  <!-- Element template selector: -->
  <div class="element-type-selector">
    <h5>Element template: </h5>
    <!-- v-for list of the section type options: -->
    <div class="element-type-option" 
      v-for="template in ELEMENT_TEMPLATES"
      :class="{'selected-element-type': selected_template.id == template.id}" 
      @click="select_template(template)"
    >

      <div 
        class="element-type-icon"
        :class="{bold: template.bold}"
      >
        <image-icon v-if="template.id == 'image'"></image-icon>
        <span v-else>{{template.icon}}</span>
      </div>

      <div class="option-description">
        <p class="bold">{{template.title}}</p>
        <p class="small-font">{{template.description}}</p>
      </div>

    </div>
  </div>

  <!-- Config section -->
  <div class="small-font padding">
    <div>Config <span v-if="selected_template.id">for yr <b>{{selected_template.title}}</b>:</span></div>
    <div class="component-details" v-if="component_info">
      Component: {{ component_info.title }}
    </div>
    <div class="element-template-details">
      selected_template: 
    </div>
    <div class="element-config">

    </div>
  </div>

</div>
</template>

<script>

import element_templates from '~/modules/templates/element_templates.js';
import component_templates from '~/modules/templates/component_templates.js';
import { query_array_of_objects } from '~/modules/helpers.js';

export default {

  props: {
    value: {
      type: Object
    },
    editable: {
      type: Boolean
    }
  },
  computed: {
    component_info() {
      let search_id = this.selected_template.element.component_id;
      let matching_components = query_array_of_objects(this.COMPONENT_TEMPLATES, {id: search_id});
      return matching_components[0];
    }
  },
  data() {
    return {

      // Static list of element template options:
      ELEMENT_TEMPLATES: element_templates,
      COMPONENT_TEMPLATES: component_templates,

      // The currently selected template id:
      selected_template: { id: '', element: {}, },
      
    }
  },

  mounted() {
    // When the editor starts we make sure the draft is up to date. 
    this.$emit('reset');
  },

  methods: {
    // Creating a new element!
    create_element(element) {
      this.$emit('input', element);
    },

    select_template(template) {
      this.selected_template = template;
      this.$emit('updateDraft', template.element);
    }
  }
}

</script>

<style lang="scss">

// This is for the interface that pops up when you press the gear icon. 
#element-editor {
  position: absolute;
  display: flex;
  width: 100%;
  height: 200px;
  animation: fadein linear .2s;
  background: var(--card);
  box-shadow: 0px 0px 5px rgba(0,0,0,.5);
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
    filter: brightness(115%);
    .option-description {
      color: var(--card-text);
    }
  }
  // For the currently selected element option:
  &.selected-element-type {
    filter: brightness(130%);
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