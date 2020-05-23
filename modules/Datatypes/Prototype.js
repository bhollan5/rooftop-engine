
/*
  This object is used as a template for any data that represents an
    abstract, NON-TERMINAL SYMBOL.  

  Basically, it lets us code datatypes. 

  For example, "Page" is an abstract entity - a datatype. 

*/

export function Prototype() {

  // ⍟ PUBlIC PROPERTIES
  this.pub_props = [
    { name: 'id', type: 'string', unique: true, required: true, },
    { name: 'name', type: 'string', required: true, },
  ]

  // ⍦ PRIVATE PROPERTIES
  this.priv_props = [
    { name: 'access', type: 'access', }
  ]

}
