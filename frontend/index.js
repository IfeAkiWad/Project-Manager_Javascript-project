// document.addEventListener('DOMContentLoaded', () => { //fires when the initial HTML document has been completely loaded and parsed without being slowed down by images and stylesheets, etc.
    Developer.getDeveloper()
    Projects.getAllProjects()
    newProjectForm()
    Projects.deleteProject()
    projectSearch()
// })

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
        // debugger
        console.log(event)
        searchTerm = event.target.value.toLowerCase()
        
        // console.log(developerId)

        if(searchTerm !== "" && searchTerm == `${searchTerm}` ) {
            projectsContainer.innerHTML = ""
            makeApiCall(searchTerm)
            
        }
        // console.log(projDevId === developerId)
        
    })
}    
     
function makeApiCall(searchTerm) { //(searchTerm) {
    console.log(searchTerm)
    // let projDevId = Projects.all.filter(p => {
    //     return p.developer_id
    // })
    // let developerId = Developer.all.filter( d => {
    //      return d.id === projDevId
    // })

    console.log('making API call')
    fetch(`http://localhost:3000/projects`) //?q=` + searchTerm)
    .then(response => response.json())
    .then(result => allProjects = result)
    .then(result => {
        console.log(result)

        let filteredProjects = allProjects.filter(project => {
            if (project.developer_id == user.id) {
                return project.name.toLowerCase().includes(searchTerm)//&& project.developer_id
            }
        })
        console.log(filteredProjects)


        addSearchToDom(filteredProjects)        
    })
}

function addSearchToDom(filteredProjects) { //(response) {
    

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





































//     // console.log(response)
//     let projectsClass = Projects.all.filter(i => {
//         return i.name || i.id
//     })
    // filteredProjects.forEach( project => {
    //     // console.log(project)
    //     // let renderProject = project
    //     // renderProject.filter(proj => {
            // let p = new Projects(
            //     project.id, 
            //     project.name, 
            //     project.started, 
            //     project.deadline, 
            //     project.description,
            //     project.developer_id
            // )
            // p.renderProject()
    //     // })
    //     projectsContainer.innerHTML = filteredProjects

    // })
    // projectsContainer.innerHTML = renderProject
    // projectsContainer.innerHTML = ""
    // let projList = document.getElementsByClassName("ul-project")
    // filteredProjects.forEach( project => {
    //     projList.textContent = project
    //     console.log(projList)
        // let projListArray = projList.toArray()
        // console.log(projListArray)
        // projListArray.forEach( li => {
        //     let p = new Projects(
        //         li.id, 
        //         li.name, 
        //         li.started, 
        //         li.deadline, 
        //         li.description,
        //         li.developer_id
        //     )
        //         p.renderProject()
        // })
    // })







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

// }

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


