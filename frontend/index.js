// document.addEventListener('DOMContentLoaded', () => { //fires when the initial HTML document has been completely loaded and parsed without being slowed down by images and stylesheets, etc.
    Developer.getDeveloper()
    Projects.getAllProjects()
    newProjectForm()
    Projects.deleteProject()
    projectSearch()
// })

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
let projectsContainer = document.getElementById("projects-container")

function projectSearch() {
    let searchBar = document.getElementById('search')
    console.log(searchBar)
    searchBar.innerHTML += 
    `
        <input type="text" id="search-input" placeholder="Search Your Project.." >
    `
   
    let searchField = document.getElementById('search-input')
    searchField.addEventListener('keyup', (event) => {
        searchTerm = event.target.value.toLowerCase()

        if(searchTerm !== "") {
            makeApiCall(searchTerm)
        }
    })
    // console.log(searchTerm)
}    
     
function makeApiCall(searchTerm) { //(searchTerm) {
    console.log(searchTerm)
    // console.log(filteredProjects)
    console.log('making API call')
    fetch(`http://localhost:3000/projects`) //?q=` + searchTerm)
    .then(response =>  response.json())
    .then(result => allProjects = result)
    .then(result => {
        console.log(result)
        let filteredProjects = allProjects.filter(project => {
            return project.name.toLowerCase().includes(searchTerm)
            
        })
        console.log(filteredProjects)
        if(filteredProjects) {
            // addSearchToDom(result)
            addSearchToDom(filteredProjects)
            // let projectRender = filteredProjects
            
        }
    })
}
    //  console.log(allProjects)


function addSearchToDom(filteredProjects) { //(response) {
    console.log('ready to add to DOM')
//     // console.log(response)
//     console.log(filteredProjects)
    let renderProjects = filteredProjects
//     let projectsClass = Projects.all.filter(i => {
//         return i.name || i.id
//     })

    renderProjects.forEach( project => {
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
    projectsContainer.innerHTML = renderProjects









    // projectRender.forEach(project => {
    //     for(const x of project) {
    //         let p = new Projects(
    //             x.id, 
    //             x.name, 
    //             x.started, 
    //             x.deadline, 
    //             x.description,
    //             x.developer_id
    //         )
    //         p.renderProject()
    //     }
    // })

    // for(const project of projectRender) {
    //     let p = new Projects(
    //         project.id, 
    //         project.name, 
    //         project.started, 
    //         project.deadline, 
    //         project.description,
    //         project.developer_id
    //     )
    //     p.renderProject()
    // }
    // projectsContainer.innerHTML = projectRender

}

// console.log(searchTerm)
        // let filteredProjects = allProjects.filter(project => {
        //     return project.name.toLowerCase().includes(searchTerm)
        // })
        // console.log(allProjects)

 // const submitBtn = document.getElementById("submitBtn")
    // submitBtn.addEventListener('click', handleSearch)

// function handleSearch(event) {
//     console.log(event)
//     console.log('inside handleSearch method')
//     const searchInput = document.getElementById("search-input") //input field
//      let searchTerm = searchInput.value.split(" ").join("+").toLowerCase()
//      if(searchTerm !== "") {
//          makeApiCall(searchTerm)
//      }
// }



    // console.log(projectsContainer.childNodes)
    // const searchInput = document.getElementById("search-input") //input field
    // let projectsContainer = document.getElementById('projects-container')
//     let searchTerm = searchInput.value.split(" ").join("+").toLowerCase()
//     if(searchInput.value != "") {
//         projectsContainer.innerHTML = ""
//     }

//     let fetchedProjects = response
//     fetchedProjects.map(project => {
//         console.log(project)
//     })
   
    // fetchedProjects.forEach(project => {
    //     // console.log(project)
    //     let projectName = project.name
    //     if(projectName.includes(searchTerm)) {
    //         let p = new Projects(
    //             project.id, 
    //             project.name, 
    //             project.started, 
    //             project.deadline, 
    //             project.description, 
    //             project.developer_id
    //         )
    //         p.renderProject()
    //     }
       
        // let filteredProject = 
        // if (project.name == searchTerm)
        //     // let p = new Projects(
        //     //     project.id, 
        //     //     project.name, 
        //     //     project.started, 
        //     //     project.deadline, 
        //     //     project.description, 
        //     //     project.developer_id
        //     // )
        //     renderProject(searchTerm)
    // })

    // let nameSearch = search.map(i => {
    //     return i.name
    // })
    // console.log(nameSearch)
    // const searchInput = document.getElementById("search-input") //input field
    // let projectsContainer = document.getElementById('projects-container')
    // if(searchInput.value != "") {
    //     projectsContainer.innerHTML = ""
    // }

    // let searchTerm = searchInput.value.split(" ").join("+").toLowerCase()
    // let search = response
    // let filteredSearch = search.forEach(project => {
    //         if (project.name.includes(searchTerm)){
    //             return project
    //         }
    //         // if(project.name == searchTerm) {
    //         //     console.log('EUREKA!')
    //         // }
    //         // project.name.toLowerCase().includes(searchTerm)
    //     })
    //     console.log(filteredSearch)

    //I'M STUCK HERE!




































    //     console.log('ready to add to DOM')
    //     console.log(response)
        
    //     // const searchInput = document.getElementById("search-input") //input field
    //     // let searchTerm = searchInput.value.split(" ").join("+")
        
        // let projectNames = Projects.all.map(i => {
        //     return i.name 
        // })
    //     // console.log(projectNames)

    //     // nameSearch.forEach(p => {
    //     //     let projectsContainer = document.getElementById('projects-container')
    //     //     projectsContainer.innerHTML += `${p}`
    //     // })

    //     allProjects.filter(p => {
    //         const searchInput = document.getElementById("search-input") //input field
    //         let searchTerm = searchInput.value.split(" ").join("+")
            
    //         if (p.name === searchTerm) {
    //     //         let projects = p
    //     //         projects.forEach(proj => {
    //     //             let p = new Projects(
    //     //                 proj.id, 
    //     //                 proj.name, 
    //     //                 proj.started, 
    //     //                 proj.deadline, 
    //     //                 proj.description,
    //     //                 proj.developer_id
    //     //             )
    //                 return p.name
                    
    //     //         })
    //         }
    //         renderProject()
    //     })
    //     // if (search == projectNames) {
    //     //     nameSearch.forEach(search => {
    //     //         let p = new Projects(
    //     //             search.id, 
    //     //             search.name, 
    //     //             search.started, 
    //     //             search.deadline, 
    //     //             search.description,
    //             search.developer_id
    //         )
    //         p.renderProject()
    //     })
    // }
    

    // if (nameSearch === projectNames) {
        // NOT WORKING ⬇️
        // response.forEach(proj => {
        // //   console.log(proj.name, proj.started, proj.deadline, proj.description, proj.developer_id)
        //     console.log('now comparing')
        //     if (nameSearch === projectNames) {
        //         let p = new Projects(
        //             proj.id, 
        //             proj.name, 
        //             proj.started, 
        //             proj.deadline, 
        //             proj.description,
        //             proj.developer_id
        //         )
        //         p.renderProject()
        //     }
        // })
    // }
    // nameSearch.forEach(name => {
    //     let projectsContainer = document.getElementById('projects-container')
    //     name.renderProject()
    // })


