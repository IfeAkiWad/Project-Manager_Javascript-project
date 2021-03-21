document.addEventListener('DOMContentLoaded', () => {
    Developer.getDeveloper()
    Projects.getAllProjects()
    newProjectForm()
    Projects.deleteProject()
})

// BELOW HANDLES ALL THAT PERTAINS TO NEW PROJECT FORM
function newProjectForm() {
    let projectForm = document.getElementById("project-form")
    
    projectForm.innerHTML +=
    `
    <form id='form'>
    <h2 id="form-header"> Manage a new project! </h2><br>
    <label for="name">Project Name:</label>
    <input type="text" class="name" id="name"><br><br>
    <label for="started">Project Started:</label>
    <input type="date" class="started" id="started"><br><br>
    <label for="deadline">Project Deadline:</label>
    <input type="date" class="deadline" id="deadline"><br><br>
    <label for="description">Project Description:</label><br><br>
    <textarea id="description"></textarea><br><br>
    <input type="submit" class="submit" value="New Project">
    <br><br>
    </form>
    `

    projectForm.addEventListener("submit", submitProjectForm)
}

function submitProjectForm(event) {
    event.preventDefault();
    let name = document.getElementById("name").value
    let started = document.getElementById("started").value
    let deadline = document.getElementById("deadline").value
    let description = document.getElementById("description").value

    console.log(name, started, deadline, description)
    
    let project = {
        name: name, 
        started: started,
        deadline: deadline,
        description: description
    };

    // once form submitted => fetch post request to backend
    // error: not processing data --- FIXED
    fetch('http://localhost:3000/projects', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(project)
    
    })
    .then(response => response.json())
    .then(project => {
        const {id, name, started, deadline, description, developer_id} = project
    let p = new Projects(id, name, started, deadline, description, developer_id)
            p.renderProject()
    })
    
    // TO CLEAR NEW PROJECT FORM AFTER SUBMISSION
    name = document.getElementById("name").value = ""
    started = document.getElementById("started").value = ""
    deadline = document.getElementById("deadline").value = ""
    description = document.getElementById("description").value = ""
}

