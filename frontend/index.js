    Developer.getDeveloper()
    Projects.getAllProjects()
    newProjectForm()
    Projects.deleteProject()
    projectSearch()

let user //globally accessible to all files

// BELOW HANDLES ALL THAT PERTAINS TO NEW PROJECT FORM
function newProjectForm() {
    let projectForm = document.getElementById("project-form")
    
    projectForm.innerHTML +=
    `
    <form id='form'> 
    <h2 id="form-header"> Manage a new project! </h2><br>
    <label for="name">Project Name:</label>
    <input type="text" class="name" id="name" required><br><br>
    <label for="started">Project Started:</label>
    <input type="date" class="started" id="started" required><br><br>
    <label for="deadline">Project Deadline:</label>
    <input type="date" class="deadline" id="deadline" required><br><br>
    <label for="description">Project Description:</label><br><br>
    <textarea id="description" required></textarea><br><br>
    <select name="developer" id="developer" required>
                    <option name="developer_id">Who are you?</option>
                    <option name="developer_id" value="13">Mary Jenkins</option>
                    <option name="developer_id" value="14">Billy Thornton</option>                   
    </select><br><br>
    <input type="submit" class="submit" value="New Project">
    <br><br>
    </form>
    `

    projectForm.addEventListener("submit", submitProjectForm)
}

function submitProjectForm(event) {
    event.preventDefault(); //prevents post request from being submitted
    let name = document.getElementById("name").value
    let started = document.getElementById("started").value
    let deadline = document.getElementById("deadline").value
    let description = document.getElementById("description").value
    let developer = document.getElementById("developer").value

    console.log(name, started, deadline, description, developer)
    
    let project = {
        name: name, 
        started: started,
        deadline: deadline,
        description: description,
        developer: developer
    };

    // once form submitted => fetch post request to backend
    // error: not processing data --- FIXED
    fetch('http://localhost:3000/projects', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(project) //converts javascript objects into strings.
        
    
    }) //consuming code: waiting on promise to be fulfilled
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

//PROJECT SEARCH BAR FOR DEVELOPER
let allProjects = []
let searchTerm
const projectsContainer = document.getElementById("projects-container")

function projectSearch() {
    let searchBar = document.getElementById('search')
    console.log(searchBar)
    searchBar.innerHTML += 
    `
        <input type="text" id="search-input" class="search" placeholder="Search Your Project.." >
    `
   
    let searchField = document.getElementById('search-input')
    searchField.addEventListener('keyup', (event) => {
        console.log(event)
        searchTerm = event.target.value.toLowerCase()
        
        if(searchTerm !== "" && searchTerm == `${searchTerm}` ) {
            projectsContainer.innerHTML = ""
            makeApiCall(searchTerm)
            
        }
        
    })
}    
     
function makeApiCall(searchTerm) { //(searchTerm) {
    console.log(searchTerm)
   
    console.log('making API call')
    fetch(`http://localhost:3000/projects`) 
    .then(response => response.json())
    .then(result => allProjects = result)
    .then(result => {
        console.log(result)

        let filteredProjects = allProjects.filter(project => {
            if (project.developer_id == user.id) {
                return project.name.toLowerCase().includes(searchTerm)
            }
        })
        console.log(filteredProjects)


        addSearchToDom(filteredProjects)        
    })
}

function addSearchToDom(filteredProjects) { 
    

    console.log('ready to add to DOM')

        filteredProjects.forEach( project => {
                let p = new Projects(
                    project.id, 
                    project.name, 
                    project.started, 
                    project.deadline, 
                    project.description,
                    project.developer_id
                )
                p.renderProject() 
        })
}

 /* currently the the project container does not reappend the project index after the search bar has been cleared. It requires a browser refresh
    I have to find a way to show a relationship between the searched project and developer
 */








































