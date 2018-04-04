const pickProps = (object, ...props) => props.reduce((acc, prop) => {
  acc[prop] = object[prop];
  return acc;
}, {}); 

const handleNon200Response = (response) => {
  if (response.status < 200 || response.status >= 300) {
    throw new Error(response.status);
  }
  return response.json();
}

const handlePromiseFailure = (error) => {
  alert('There was a problem fulfilling your request. Please try again.');
  console.log(error);
}

module.exports = { pickProps, handleNon200Response, handlePromiseFailure };