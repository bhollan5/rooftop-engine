<template>
<div class="content">
  
      <div class="section-container">

        <!-- Article header: -->
        <div id="article-header"></div>

        <!-- Article subheader: -->
        <div id="article-subheader"></div>

        <!-- Tabs: -->
        <div class="tab-container">
          <div class="tabs" >
            <div class="tab" ></div>
            <div class="tab" ></div>
            <div class="tab" ></div>
          </div>
        </div>

        <!-- Section titles: -->
        <div class="section-title">
        </div>

        <!-- Subsection title, with bullet:  -->
        <div class="subsection-title-container" >
          <div class="subsection-number"></div>
          <div class="subsection-title"></div>
        </div>
        
        <!-- Paragraphs: -->
        <div class="paragraph-section" >
        </div>

      </div>

</div>
</template>

<script>


export default {
  name: 'non-fic-loader',

  data() {
    return {
      
    }
  },

  computed: {
  },

  methods: {
  },

  

}
</script>

<style lang="scss" scoped>

// Content contains all the inputs:
.content {
  width: 100%;
  max-width: 600px;
  align-content:flex-start;
}

// v-for generated
.input-container {
  position: relative;
  transition-duration: .5s;
  &.expanded-container {
    min-height: 200px;

  }
}

// This is for the interface that pops up when you press the gear icon. 
.edit-element-interface {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  background: var(--card);
  z-index: 2;
  h5 {
    padding: 5px;
  }
}

// Styling for different element types:
#article-header {
  margin-bottom: -10px;
  margin-top: 25px;
  height: 55px;
  width: 100%;
  background: var(--input);

}
#article-subheader {
  margin-top: 30px;
  height: 24px;
  width: 100%;
  background: var(--input);
}

.tab-container {

}
.tabs {
  display: flex;
  margin-top: 50px;
  margin-bottom: 40px;
  border-bottom: solid 2px var(--bg-text2);

  .tab {
    height: var(--small-font-size);
    width: 100px;
    margin: 10px 25px;
    position: relative;
    margin-top: -2px;
    background: var(--input);
  }
}
.tab-content {

}


.section-title {
  margin-top: 20px;
  height: 35px;
  background: var(--input);
}

// TODO: The subsection should be closer to the paragraphs.
.subsection-title-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;

  .subsection-number {
    width: 50px;
    margin: 0px;
    height: 24px;
    background: var(--input);
  }
  .subsection-title {
    margin: 0px;
    background: var(--input);
    height: 24px;
    width: calc(100% - 70px);
  }
}

.paragraph-section {
  height: 125px;
  width: 100%;
  background: var(--input);
  margin-top: 20px;
}

</style>