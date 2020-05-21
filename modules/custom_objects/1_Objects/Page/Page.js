import { query_array_of_objects } from '~/modules/helpers.js';
import {Element} from '~/modules/globals';

export function Page(template_id) {

  this.name = 'New Page';
  this.id = 'new-page';
  this.elements = [
    new Element('subheader'),
  ];

}
