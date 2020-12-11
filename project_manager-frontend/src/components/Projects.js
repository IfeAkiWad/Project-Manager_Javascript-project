class Projects {
    constructor(project) {
        this.project = project
        console.log(this)
    }

    // class method will use data to instatiate project objects
    static getAll() {  
        api.getAllProjects().then((data) => 
            data.forEach(project => new Projects(project))
        );
    }
}