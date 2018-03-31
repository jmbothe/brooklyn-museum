const pickProps = (object, properties) => properties.reduce((acc, prop) => {
  acc[prop] = object[prop];
  return acc;
}, {}); 

module.exports = { pickProps };