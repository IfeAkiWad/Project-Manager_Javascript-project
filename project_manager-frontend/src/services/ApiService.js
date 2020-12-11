class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    getAllProjects = () => fetch(`${this.baseURL}/projects`).then(response => response.json())
}
