<template>
<!-- Popup shown when the gear button is clicked: -->
<window id="element-editor" display="flex"
  :padding="[0,0,0,0]"
  :depth="3"
  :title="'Element: '"
  :flex="true"
  width="100%"
  :style="{
    font: 'Inconsolata'
  }"
>

  <template #body>
    <!-- Element template selector: -->
    <!--<div class="element-type-selector">-->
    <side-icon-menu class="scroll-y inconsolata">

      <template #header>
        <div class="card padding">Element template:</div>
      </template>

      <!-- v-for list of the section type options: -->
      <div class="element-type-option" v-if="0"
        v-for="template in ELEMENT_TEMPLATES"
        :class="{'selected-element-type': element.template_id == template.id}" 
        @click.stop="select_template(template)"
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
    </side-icon-menu>
    <!--</div>-->

    <!-- Config section -->
    <container style="width: 60%;" v-if="0">

      <card title="Element config:" :width="'100%'" min>
        <div v-if="component_info && 0">
          Component: <b>{{ component_info.title }}</b>
        </div>

        <div>

          <div class="b">Prop config:</div>
          <div v-for="(value, field) in element.prop_config" class="flex-container align-center">
            <b>{{field}}: &nbsp;</b>
            <dropdown title="Type:" 
              :options="['Static', 'Element', 'Document', 'Database']"
              :value="pretty_connection_type(value)">
            </dropdown>
            <text-field title="field" 
              nopadding
              v-if="pretty_connection_type(value) != 'Static'"
              :value="value.field"></text-field>
          </div>
        </div>

      </card>

      
      
    </container>

    <tab-container>
      <template #General>
        hey
      </template>
      <template #Content>
        wow
      </template>
      <template #Style>
        
        
        <div class="secondary small-font">Size: </div>
        <size-editor></size-editor>

      </template>
    </tab-container>

  </template>

  <template #footer>
    <button class="window-button"
      @click="save_element()">
      Save!
    </button>
  </template>

</window>
</template>

<script>

import element_templates from '~/modules/datatypes/Element/element_templates.js';
import component_templates from '~/modules/datatypes/ComponentInfo/all_component_info.js';
import { query_array_of_objects } from '~/modules/helpers.js';

export default {

  props: {
    value: {
      type: Object
    },
    editable: {
      type: Boolean
    },
    propValues:{ 
      type: Object
    }
  },
  computed: {

    element() {
      let el = this.$store.getters['drafts/element/element'];
      return el;
    },


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

    save_element() {
      console.log("🔥 Called");
      this.$store.dispatch('draft_element/save');
    },


    reset_draft() {
      
    },


    // Creating a new element!
    create_element(element) {
      this.$emit('input', element);
    },

    // Updating the draft element when you select a template
    select_template(template) {
      this.$store.dispatch(
        'draft_element/select_template', template.id,
      )
    },

    pretty_connection_type(connection_obj) {
      if (typeof(connection_obj) != 'object') {
        return 'Static';
      } else if (connection_obj.connection_type == 'doc_data') {
        return 'Document'
      } else {
        return 'Element'
      }
    },

  }
}

</script>

<style lang="scss">

// This is for the interface that pops up when you press the gear icon. 
#element-editor {
  position: absolute;
  width: 100%;
  height: 400px;
  animation: fadein linear .2s;
  box-shadow: 0px 0px 5px rgba(0,0,0,.5);
  z-index: 11;
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
    min-width: 35px;
    height: 35px;
    box-shadow: inset 0px 0px 5px black;
    font-family: crimsonText;
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
  }
}

</style>