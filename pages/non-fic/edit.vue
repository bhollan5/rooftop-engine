<template>
  <div class="page-content flex-container">

    <div id="side-bar">

    </div>

    <!-- The content container, which holds the entire editor -->
    <div id="content">

      <!-- An input container is created for each node in our data. -->
      <div class="input-container" v-for="(data, i) in articleData">

        <div class="gear-icon" @click="editSelect(i)"
          :class="{'gear-icon-selected': editElement == i}">
          <gear-icon></gear-icon>
        </div>

        <div class="edit-element-interface" v-if="editElement == i">
        
        </div>

        <text-field id="article-header" v-if="data.type == 'header'"
          placeholder="Article Title"></text-field>

        <text-field id="article-subheader" v-else-if="data.type == 'subheader'"
          placeholder="Article Subheader"></text-field>

        <div id="tabs" v-else-if="data.type == 'tabs'">
          <div class="tab">Main Paper</div>
          <div class="tab">Definitions</div>
          <div class="tab add-tab">+ Add Tab</div>
        </div>


        <text-field class="section-title" v-else-if="data.type =='section-title'"
          placeholder="1. Section Header">
        </text-field>

        <div class="subsection-title-container" v-else-if="data.type =='subsection-title'">
          <text-field class="subsection-number" placeholder="1.1"></text-field>
          <text-field class="subsection-title" placeholder="Subsection Header"></text-field>
        </div>
        
        <div class="paragraph-section" v-else-if="data.type == 'paragraph'">
          <text-field placeholder="Regular paragraphs go here!" textarea></text-field>
        </div>
      </div>

    </div>
    
  </div>
</template>

<script>
import textField from '@/components/inputs/text-field.vue';
import gearIcon from '@/components/icons/gear-icon.vue';

export default {
  components: {
    textField,
    gearIcon
  },
  data() {
    return {
      editElement: -1, // This indicates the index of the element being edited
      articleData: [
        {
          type: 'header',
          content: '',
        },
        {
          type: 'subheader',
          content: '',
        },
        {
          type: 'tabs',
          content: '',
        },
        {
          type: 'section-title',
          content: '',
        },
        {
          type: 'subsection-title',
          content: ''
        },
        {
          type: 'paragraph',
          content: ''
        },
      ]
    }
  },
  methods: {
    editSelect(i) {
      if (this.editElement == i) {
        this.editElement = -1;
      } else {
        this.editElement = i;
      }
    }
  }
}
</script>

<style lang="scss">
#side-bar {
  width: 20%;
}
#content {
  width: 100%;
  max-width: 600px;
}

.input-container {
  position: relative;
}

.gear-icon {
  position: absolute;
  height: 30px;
  width: 35px;
  left: -33px;
  padding: 5px;
  border-radius: 5px 0px 0px 5px;
  top: 0px;
  fill: var(--bg2);
  &.gear-icon-selected {
    background: var(--bg2);
    fill: var(--bg2-text);
  }
  cursor: pointer;
  &:hover {
    fill: var(--bg2-text);
  }
}

// This is for the interface that pops up when you press the gear icon. 
.edit-element-interface {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--bg2);
  z-index: 2;
}

// Styling for different element types:
#article-header input{
  font-weight: bold;
  font-size: var(--h1-font-size);
}

#tabs {
  display: flex;
  margin-top: 50px;
  margin-bottom: 40px;
  border-bottom: solid 2px var(--bg-text2);

  .tab {
    font-size: var(--small-font-size);
    min-width: 100px;
    text-align: center;
    padding: 5px;
    cursor: pointer;
  }
  .add-tab {
    color: var(--bg-text2);
    &:hover {
      color: var(--bg-text);
    }
  }
}

.section-title input {
  font-weight: bold;
  text-align: center;
  font-size: var(--h2-font-size);
}


.subsection-title-container {
  display: flex;
  width: 100%;
  padding: 0px;
  justify-content: space-between;
  .subsection-number {
    width: 50px;
  }
  .subsection-title {
    width: calc(100% - 70px);
  }
  input {
    font-weight: bold;
  }
}

.paragraph-section {

}
</style>
