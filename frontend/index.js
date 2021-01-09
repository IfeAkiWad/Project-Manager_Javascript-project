const BASE_URL = 'http://localhost:3000'

document.addEventListener("DOMContentLoaded", () => {
    getAllProjects();
    newProjectForm()
    console.log(getAllProjects())
})

// fetch projects index = ApiService
function getAllProjects() {
    fetch(`${BASE_URL}/projects`)
    .then((response) => response.json())
    .then(projects => {
        console.log(projects)
        // we do something with the fetched data 
        // iterating through the projectS data
        for (const project of projects){
            let p = new Projects(
                project.id,     
                project.name, 
                project.started,
                project.deadline,
                project.description,
                project.completed)
            p.renderProject()
        }
    })
    
}


// once form submitted => fetch post request to backend
// do something with returned object


// create new project = ApiService
// create form
function newProjectForm() {
    let projectForm = document.getElementById("project-form")

    projectForm.innerHTML +=
    `
    <form>
    <label for="name">Project Name:</label>
    <input type="text" id="name"><br><br>
    <label for="started">Project Started:</label>
    <input type="date" id="started"><br><br>
    <label for="deadline">Project Deadline:</label>
    <input type="date" id="deadline"><br><br>
    <label for="description">Project Description:</label><br>
    <textarea id="description"></textarea><br><br>
    <label for="completed">Project Completed:</label>
    <input type="checkbox" id="completed" value=0><br><br>
    <input type="submit" value="New Project">
    </form>
    
    `
    // add event listener 
    projectForm.addEventListener("submit", submitProjectForm)
}

// add event listener 
function submitProjectForm() {
    event.preventDefault();
    let name = document.getElementById("name").value
    let started = document.getElementById("started").value
    let deadline = document.getElementById("deadline").value
    let description = document.getElementById("description").value
    let completed = document.getElementById("completed").value

    // console.log(name, started, deadline, description, completed)
    let project = {
        name: name, 
        started: started,
        deadline: deadline,
        description: description,
        completed: completed
    };
    // once form submitted => fetch post request to backend
    // error: not processing data
    fetch(`${BASE_URL}/projects`, { 
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( { project } )
    })
    .then(response => response.json())
    .then(project => {
        let p = new Projects(
            project.id,     
            project.name, 
            project.started,
            project.deadline,
            project.description,
            project.completed)
        p.renderProject()
    })
}


