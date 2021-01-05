class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    // fetch projects index
    getAllProjects = () => fetch(`${this.baseURL}/projects`).then((response) => response.json())
}
