<!-- The SVG uploader returns plain svg text! 
  Use:
  <svg-uploader v-model="mySvgVariable"></svg-uploader>
-->
<template>
<div class="image-uploader" @change="uploadFile($event)" 
  enctype="multipart/form-data" @click="openSVGInput()">
    
  <!-- The file uploader + image display! -->
  <input type="file" accept="image/svg" :ref="'fileInput' + id" style="display: none;">
  <p v-if="!value">+ Upload SVG</p>
  <div v-html="value" v-else class="svg-image"></div>

  <!-- The edit button, to open the SVG in the editor. -->
  <div class="icon-button" 
    v-if="value"
    @click.stop="open_editor(value)">
    <edit-icon></edit-icon>
  </div>

</div>
</template>

<script>
export default {

  data() {
    return {
      svgData: '',
      openInEditor: false, // Indicates if we're waiting on the editor. 
    }
  },

  props: {
    // Calling this 'value' so we can use v-model
    value: {
      type: String,
    },
    // 
    id: {
      type: String,
    }
  },

  // This "hasInput" variable changes the icon color when we type. 
  computed: {
    hasInput() {
      return this.value.length > 0;
    },
    svgEditorOpen() {
      return this.$store.getters['svg/svg_editor_open'];
    }
  },

  watch: {
    // When a file is open in the editor, we wait for it to close, then snag it's file.
    svgEditorOpen() {
      if (this.openInEditor && !this.svgEditorOpen) {
        this.openInEditor = false,
        this.getFileFromEditor();
      }
    }
  },

  methods: {

    // Clicks on the hidden input so we can use our custom-styled input
    openSVGInput() {
      this.$refs['fileInput' + this.id].click()
    },

    // Called when a file is uploaded
    uploadFile(event) {
      console.log("File data: ");
      console.log(event);
      console.warn(typeof(event));
      let _file = event.target.files[0];
      let fileName = _file.name;

      // Reading the file's contents into a string:
      this.readFileContent(_file).then(fileContent => {

        this.$store.commit("svg/load_svg_from_string", fileContent);
        this.$emit('input', fileContent); // Grab this data from the parent with @upload="x"

        // When this is true, we watch to see when the editor closes, and grab
        // the contents when it closes
        this.openInEditor = true; 

      }).catch(error => console.log(error))

    },

    open_editor(svg_content) {
      this.$store.commit("svg/load_svg_from_string", svg_content);
    },

    // Updating based on changes in the editor
    getFileFromEditor() {
      let newFile = this.$store.getters['svg/raw_svg_string'];
      this.$emit('input', newFile);
    },

    // This function takes an svg file and returns the actual XML code of that SVG as a string.
    // It uses FileReader, a web API available by default in modern browsers.
    readFileContent(file) {
      const reader = new FileReader()
      // We're returning a promise, which  means you can use the .then(() => {}) function on this one!
      return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result)
        reader.onerror = error => reject(error)
        reader.readAsText(file)
      })
    },
  },

}

</script>

<style scoped lang="scss">
.image-uploader {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  position: relative;
}
p {
  font-size: var(--small-font-size);
  text-align: center;
}

.icon-button {
  position: absolute;
  bottom: 0px;
  left: 10px;
  width: 20px;
  box-shadow: 0px 0px 10px black;

}
</style>