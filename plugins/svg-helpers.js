// This is a module for global functions for svg handling.

// From: https://nuxtjs.org/guide/plugins#combined-inject
export default ({ app }, inject) => {
  inject('svg', {

    xml_to_string(xml) {

    },

    string_to_xml(str) {
      let parser = new DOMParser();
      let xml_doc = parser.parseFromString(str, "text/xml");
      return xml_doc;
    },

  })
}