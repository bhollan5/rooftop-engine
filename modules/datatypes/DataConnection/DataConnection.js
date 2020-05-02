import { query_array_of_objects } from '~/modules/helpers.js';

// The object class for our custom datatype, DataConnection
//   element attributes:
//      - template_id:    String
//      - component_id:   String
//      - local_data:     Array
//      - static_data:    Array
//      - prop_config:    Object
export function DataConnection(connection_type="static", field, value) {

  if (connection_type == 'static') {
    this.create_static(field, value);
  } else if (connection_type == 'element') {

  } else if (connection_type == 'doc_data') {

  }
    
}

DataConnection.prototype.create_static = function(field, value) {
  this.connection_type = 'static';
  this.field = field;
  this.value = value;
}