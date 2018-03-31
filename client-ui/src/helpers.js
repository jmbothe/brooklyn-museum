const pickProps = (object, ...props) => props.reduce((acc, prop) => {
  acc[prop] = object[prop];
  return acc;
}, {}); 

module.exports = { pickProps };