class Projects {
    constructor(id, name, started, deadline, description, completed) {
        this.id = id
        this.name = name
        this.started = started
        this.deadline = deadline
        this.description = description 
        this.completed = completed
    }

    // render project instance to DOM
    renderProject() {
        let projectsDiv = document.getElementById("projects-container")

        projectsDiv.innerHTML +=
        `
        <ul>
        <h2>Project Name: ${this.name}</h2>
        <h3>Project Started: ${this.started}</h3>
        <h3>Project deadline: ${this.deadline}</h3>
        <h4>Project Description:</h4>
        <p>${this.description}</p>
        <h3>Project Completed: ${this.completed}</h3>
        </ul><br>
        `
    }
}