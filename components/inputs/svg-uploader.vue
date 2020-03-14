<!-- The SVG uploader returns plain svg text! 
  Use:
  <svg-uploader v-model="mySvgVariable"></svg-uploader>
-->
<template>
<div class="image-uploader" @change="uploadFile($event)" 
  enctype="multipart/form-data" @click="openSVGInput()" :style="{
    height: height + 'px',
    width: width + 'px',
    }">
    
  <input type="file" accept="image/svg" ref="fileInput1" style="display: none;">
  <p v-if="!value">+ Upload SVG</p>
  <div v-html="value" v-else class="svg-image"></div>

</div>
</template>

<script>
export default {

  data() {
    return {
      svgData: ''
    }
  },

  props: {
    // Calling this 'value' so we can use v-model
    value: {
      type: String,
    },
    height: {
      type: Number,
      default: 100
    },
    width: {
      type: Number,
      default: 100
    }
  },

  // This "hasInput" variable changes the icon color when we type. 
  computed: {
    hasInput() {
      return this.value.length > 0;
    }
  },

  methods: {

    // Clicks on the hidden input so we can use our custom-styled input
    openSVGInput() {
      this.$refs['fileInput1'].click()
    },

    // Called when a file is uploaded
    uploadFile(event) {
      let _file = event.target.files[0];
      let fileName = _file.name;
      // Reading the file's contents
      this.readFileContent(_file).then(fileContent => {
        this.$emit('input', fileContent); // Grab this data from the parent with @upload="x"
      }).catch(error => console.log(error))

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
}
p {
  margin-top: 40%;
  font-size: var(--small-font-size);
  text-align: center;
}
</style>