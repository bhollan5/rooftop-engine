
export function query_array_of_objects(array_of_objects, query_object) {
  return array_of_objects.filter( function(template) {
    for (let field in query_object) {
      if (query_object[field] != template[field]) {
        return false;
      }
    }
    return true;
  });
}