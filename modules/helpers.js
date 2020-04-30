
export function query_array_of_objects(array_of_objects, query_object) {
  console.log(array_of_objects);
  return array_of_objects.filter( function(template) {
    for (let field in query_object) {
      if (query_object[field] != template[field]) {
        return false;
      }
    }
    return true;
  });
}

export function validate_type(object, type) {
  return (typeof(object) == type);
}