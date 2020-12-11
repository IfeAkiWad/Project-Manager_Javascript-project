// test that we can get data from the backend
const BACKEND_URL = 'http://localhost:3000/developers/3';
fetch(`${BACKEND_URL}`)
  .then(response => response.json())
  .then(parsedResponse => console.log(parsedResponse));

  console.log("testing...")
