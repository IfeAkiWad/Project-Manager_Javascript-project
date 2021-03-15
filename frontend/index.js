document.addEventListener('DOMContentLoaded', () => {
    Developer.getDeveloper()
    Projects.getAllProjects()
    newProjectForm()
    Projects.editProject()
})

// Below is code that handles all that relates to the project form.

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
    <br><br>
    </form>
    `
    // add event listener 
    projectForm.addEventListener("submit", submitProjectForm)
}

// callback function for newProjectForm()
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

   
}

// edit button for each object
// function editProject() {
//     const projectParentNode = document.getElementById('projects-container')
//     projectParentNode.addEventListener('click', (event) => { //to access each project's edit button
//         console.log('is this working?')
//         console.log(event)
//         const editBtn = document.getElementById('edit')
//         if(editBtn) {
//             console.log('inside edit button')
//             let editProject = document.getElementById("form")
//             editProject.innerHTML += // ERROR: Do not know how to clear form after appending.
//                                           // ERROR: Do not even know if the project object can be updated yet 
//             `
//             <form id='edit-form'>
//             <h2 id="form-header"> Edit project! </h2><br>
//             <label for="name">Project Name:</label>
//             <input type="text" class="name" id="name"><br><br>
//             <label for="started">Project Started:</label>
//             <input type="date" class="started" id="started"><br><br>
//             <label for="deadline">Project Deadline:</label>
//             <input type="date" class="deadline" id="deadline"><br><br>
//             <label for="description">Project Description:</label><br><br>
//             <textarea id="description"></textarea><br><br>
//             <input type="submit" class="submit" data-id=value="Update Project">
            
//             </form>
//             `
//             editProject.addEventListener("submit", updateProject(event))
//         }
//     })
// }
// // callback function for editProject()
// function updateProject(event) {
//     event.preventDefault()
//     let name = document.getElementById("name").value
//     let started = document.getElementById("started").value
//     let deadline = document.getElementById("deadline").value
//     let description = document.getElementById("description").value
//     let userInput = {
//         name: name, 
//         started: started,
//         deadline: deadline,
//         description: description
//     };
//     fetch('http://localhost:3000/projects', { 
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // 'Accept': 'application/json'
//             },
//             body: JSON.stringify(userInput)
//         })
//         .then(response => response.json())
//         .then(project => {
//             const {id, name, started, deadline, description, developer_id} = project
//            let p = new Projects(id, name, started, deadline, description, developer_id)
//                 p.renderProject()
//         })
    
//         // let updateProject = document.getElementById("project")
//         // updateProject.reset()


// }
// edit existinf project: overlay
// Will need to append datasets ??? in order to give each project its own id ????? WTF
// take a look at the Objects lesson
// function editProject(event) {
// //edit each project without triggering a page load. 
//    let projects = document.querySelector("#edit")
// //     projects.addEventListener('submit', console.log("ifeoluwa"))

// //     event.preventDefault()
//     console.log(projects)
// }
