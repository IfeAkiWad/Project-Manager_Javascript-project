// test that we can get data from the backend

// fetch(`${BACKEND_URL}/test`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse));
const api  = new ApiService('http://localhost:3000');
console.log('api')
