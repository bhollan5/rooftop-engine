// This is a module for global functions for svg handling.

// From: https://nuxtjs.org/guide/plugins#combined-inject
export default ({ app }, inject) => {
  inject('svg', {

    // For a given SVG node, this gets its children DOM elements (as opposed to attributes)
    //  Returns [ { key: String, data: Array, attributes: Object, path: Array, }, {...} ]
    get_node_elements(data, path = [0]) {
      // This will return our final product
      let elements = [];

      for (let key in data) {

        // Disregard attributes - we only want to look at elements rn. 
        if (key[0] != '@' && key != 'defs') {

          // Pushing elements from arrays:
          if (Array.isArray(data[key])) {
            data[key].forEach((element, index) => {

              // Making a fresh copy of the path, pushing a new index for this child. 
              let child_path = JSON.parse(JSON.stringify(path));
              child_path.push(index);

              // Pushing our element object!
              elements.push({ 
                key: key, 
                path: child_path,
                data: this.get_node_elements(element, child_path),
                attributes: this.get_node_attributes(element),
              });

            })
          // Pushing elements that are just objects:
          } else {
            let child_path = JSON.parse(JSON.stringify(path));
            child_path.push(0);
            elements.push({ 
              key: key, 
              path: child_path,
              data: this.get_node_elements(data[key], child_path),
              attributes: this.get_node_attributes(data[key])
            })
          }
        }
      }
      return elements;
    },

    // Returns an object of attributes for this node. 
    get_node_attributes(data) {
      let attributes = {};
      for (let key in data) {
        if (key[0] == '@') {
          let attr_name = key.slice(1);
          attributes[attr_name] = data[key];
        }
      }
      return attributes;
    },

    // For a given node, this transforms it into a tree of uniform arrays.
    element_tree(data, key) {
      let node = {
        children: [],
        attributes: {},
        key: key,
      };
      node.attributes = this.get_node_attributes(data);
      node.children = this.get_node_elements(data);
      for (let i in children) {
        children[i].data = this.element_tree(children[i].data);
      }
    },

    // All the below funcs are from here: https://goessner.net/download/prj/jsonxml/
    /*	This work is licensed under Creative Commons GNU LGPL License.

      License:` http://creativecommons.org/licenses/LGPL/2.1/
      Version: 0.9
      Author:  Stefan Goessner/2006
      Web:     http://goessner.net/ 
    */
    xml_to_json(xml, tab) {
      var X = {
        toObj: function(xml) {
            var o = {};
            if (xml.nodeType==1) {   // element node ..
              if (xml.attributes.length)   // element with attributes  ..
                  for (var i=0; i<xml.attributes.length; i++)
                    o["@"+xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue||"").toString();
              if (xml.firstChild) { // element has child nodes ..
                  var textChild=0, cdataChild=0, hasElementChild=false;
                  for (var n=xml.firstChild; n; n=n.nextSibling) {
                    if (n.nodeType==1) hasElementChild = true;
                    else if (n.nodeType==3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                    else if (n.nodeType==4) cdataChild++; // cdata section node
                  }
                  if (hasElementChild) {
                    if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                        X.removeWhite(xml);
                        for (var n=xml.firstChild; n; n=n.nextSibling) {
                          if (n.nodeType == 3)  // text node
                              o["#text"] = X.escape(n.nodeValue);
                          else if (n.nodeType == 4)  // cdata node
                              o["#cdata"] = X.escape(n.nodeValue);
                          else if (o[n.nodeName]) {  // multiple occurence of element ..
                              if (o[n.nodeName] instanceof Array)
                                o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                              else
                                o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                          }
                          else  // first occurence of element..
                              o[n.nodeName] = X.toObj(n);
                        }
                    }
                    else { // mixed content
                        if (!xml.attributes.length)
                          o = X.escape(X.innerXml(xml));
                        else
                          o["#text"] = X.escape(X.innerXml(xml));
                    }
                  }
                  else if (textChild) { // pure text
                    if (!xml.attributes.length)
                        o = X.escape(X.innerXml(xml));
                    else
                        o["#text"] = X.escape(X.innerXml(xml));
                  }
                  else if (cdataChild) { // cdata
                    if (cdataChild > 1)
                        o = X.escape(X.innerXml(xml));
                    else
                        for (var n=xml.firstChild; n; n=n.nextSibling)
                          o["#cdata"] = X.escape(n.nodeValue);
                  }
              }
              if (!xml.attributes.length && !xml.firstChild) o = null;
            }
            else if (xml.nodeType==9) { // document.node
              o = X.toObj(xml.documentElement);
            }
            else
              alert("unhandled node type: " + xml.nodeType);
            return o;
        },
        toJson: function(o, name, ind) {
            var json = name ? ("\""+name+"\"") : "";
            if (o instanceof Array) {
              for (var i=0,n=o.length; i<n; i++)
                  o[i] = X.toJson(o[i], "", ind+"\t");
              json += (name?":[":"[") + (o.length > 1 ? ("\n"+ind+"\t"+o.join(",\n"+ind+"\t")+"\n"+ind) : o.join("")) + "]";
            }
            else if (o == null)
              json += (name&&":") + "null";
            else if (typeof(o) == "object") {
              var arr = [];
              for (var m in o)
                  arr[arr.length] = X.toJson(o[m], m, ind+"\t");
              json += (name?":{":"{") + (arr.length > 1 ? ("\n"+ind+"\t"+arr.join(",\n"+ind+"\t")+"\n"+ind) : arr.join("")) + "}";
            }
            else if (typeof(o) == "string")
              json += (name&&":") + "\"" + o.toString() + "\"";
            else
              json += (name&&":") + o.toString();
            return json;
        },
        innerXml: function(node) {
            var s = ""
            if ("innerHTML" in node)
              s = node.innerHTML;
            else {
              var asXml = function(n) {
                  var s = "";
                  if (n.nodeType == 1) {
                    s += "<" + n.nodeName;
                    for (var i=0; i<n.attributes.length;i++)
                        s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue||"").toString() + "\"";
                    if (n.firstChild) {
                        s += ">";
                        for (var c=n.firstChild; c; c=c.nextSibling)
                          s += asXml(c);
                        s += "</"+n.nodeName+">";
                    }
                    else
                        s += "/>";
                  }
                  else if (n.nodeType == 3)
                    s += n.nodeValue;
                  else if (n.nodeType == 4)
                    s += "<![CDATA[" + n.nodeValue + "]]>";
                  return s;
              };
              for (var c=node.firstChild; c; c=c.nextSibling)
                  s += asXml(c);
            }
            return s;
        },
        escape: function(txt) {
            return txt.replace(/[\\]/g, "\\\\")
                      .replace(/[\"]/g, '\\"')
                      .replace(/[\n]/g, '\\n')
                      .replace(/[\r]/g, '\\r');
        },
        removeWhite: function(e) {
            e.normalize();
            for (var n = e.firstChild; n; ) {
              if (n.nodeType == 3) {  // text node
                  if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                    var nxt = n.nextSibling;
                    e.removeChild(n);
                    n = nxt;
                  }
                  else
                    n = n.nextSibling;
              }
              else if (n.nodeType == 1) {  // element node
                  X.removeWhite(n);
                  n = n.nextSibling;
              }
              else                      // any other node
                  n = n.nextSibling;
            }
            return e;
        }
      };
      if (xml.nodeType == 9) // document node
        xml = xml.documentElement;
      var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
      return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
    },

    // 
    // Turns a string into a useable XML doc.
    //
    string_to_xml(xml) {
      var dom = null;
      if (window.DOMParser) {
         try { 
            dom = (new DOMParser()).parseFromString(xml, "text/xml"); 
         } 
         catch (e) { dom = null; }
      }
      else if (window.ActiveXObject) {
         try {
            dom = new ActiveXObject('Microsoft.XMLDOM');
            dom.async = false;
            if (!dom.loadXML(xml)) // parse error ..
   
               window.alert(dom.parseError.reason + dom.parseError.srcText);
         } 
         catch (e) { dom = null; }
      }
      else
         alert("cannot parse xml string!");
      return dom;
   }

  })
}