const api = new ApiService('http://localhost:3000');
api.getAllProjects().then((data) => console.log(data));

