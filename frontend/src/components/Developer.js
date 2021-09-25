let allDevelopers;
// let allProjects = []
// // let searchTerm
// let projectsContainer = document.getElementById("projects-container")

class Developer {
    static all = []

        constructor(id, dev_name, projects) {
        this.id = id
        this.dev_name = dev_name
        this.projects = projects

        Developer.all.push(this)
    }

    static getDeveloper() {
        fetch('http://localhost:3000/developers')
        .then((response) => response.json())
        .then(developers => allDevelopers = developers)
        .then(developers => {
            console.log(developers)
            // we do something with the fetched data: 
                // iterating through the developer data
                for (const developer of developers){
                    let d = new Developer(
                        developer.id,     
                        developer.dev_name
                    )
                    d.renderDeveloper()
                }
       })
    //    .then(console.log(allDevelopers))
    }
   
    // projectAppend() {
    //     let projectsContainer = document.getElementById('projects-container')
    //     let projectsDiv = document.getElementsByClassName('proj-div')
    //     projectsContainer.appendChild(projectsDiv)
    // }

   

// RENDER DEVELOPER INSTANCE ONTO DOM
    renderDeveloper() {
        let developerDiv = document.getElementById("developer-container")
        let devDiv = document.createElement("div")
        // devDiv.dataset.id = this.id 
        devDiv.id = `${this.id}`
        devDiv.innerHTML +=
            ` 
            <button data-id=${devDiv.id} class="dev-btn">Are you ${this.dev_name}?</button>
            `
        developerDiv.appendChild(devDiv)

        //DEVELOPER ID BUTTON
        devDiv.addEventListener('click', (event) => {
            // iterate over all developers and for each developer render all their projects
            console.log(event) 
            console.log("inside devDiv aka button's parent element")
            user = this //declared globally in index.js
            let devBtn = event.target.className
            if(devBtn === "dev-btn") {
                console.log(`inside devBtn ${this.id}` )
                alert(`Welcome back, ${this.dev_name}`)
                let devName = document.getElementById("dev-name")
                devName.innerHTML = ""
                devName.innerHTML += `Your projects, ${this.dev_name}`
                // let projectsContainer = document.getElementById('projects-container')
                projectsContainer.innerHTML = ""
                allDevelopers.forEach(d => {
                    if (d.id == this.id) {
                        // console.log(d.projects[0])
                        let projects = d.projects
                        projects.forEach(proj => {
                            // console.log(proj.name, proj.started, proj.deadline, proj.description, proj.developer_id)
                            let p = new Projects(
                                proj.id, 
                                proj.name, 
                                proj.started, 
                                proj.deadline, 
                                proj.description,
                                proj.developer_id
                            )
                             p.renderProject()
                        })
                    }
                })
            }

        })
    }

    
}
    // static projectSearch() {
    //     let searchBar = document.getElementById('search')
    //     console.log(searchBar)
    //     searchBar.innerHTML += 
    //     `
    //         <input type="text" id="search-input" class="search" placeholder="Search Your Project.." >
    //     `
       
    //     let searchField = document.getElementById('search-input')
    //     searchField.addEventListener('keyup', (event) => {
    //         console.log(event)
    //         let searchTerm = event.target.value.toLowerCase()
    
    //         if(searchTerm !== "" && searchTerm == `${searchTerm}`) {
    //             projectsContainer.innerHTML = ""
    //             console.log(searchTerm)
                
    //             let filteredProjects = allDevelopers.filter( d => {
    //                 return d.projects.name.toLowerCase().includes(searchTerm)
    //             })
    //             console.log(filteredProjects)

    //             addSearchToDom(filteredProjects) 
    //         }
    //     })
    // }    

    // makeApiCall(searchTerm) {
    //     console.log(searchTerm)
    //     console.log('making API call')

    //     let filteredProjects = allDevelopers.filter( d => {
    //         return d.projects.name.toLowerCase().includes(searchTerm)
    //     })
    //     console.log(filteredProjects)

    //     addSearchToDom(filteredProjects) 

    // }
         
    // makeApiCall(searchTerm) { //(searchTerm) {
    //     console.log(searchTerm)
    
    //     console.log('making API call')
    //     fetch(`http://localhost:3000/projects`) //?q=` + searchTerm)
    //     .then(response =>  response.json())
    //     .then(result => allProjects = result)
    //     .then(result => {
    //         console.log(result)
    
    //         let developerId = Developer.filter( d => {
    //             return d.id//.includes(searchTerm)
    //         })
    //         console.log(developerId)
    
    //         let filteredProjects = allProjects.filter(project => {
    //             return project.name.toLowerCase().includes(searchTerm) //&& project.developer_id
                
    //         })
    //         console.log(filteredProjects)
    //         addSearchToDom(filteredProjects)        
    //     })
    // }
    
    // addSearchToDom(filteredProjects) { //(response) {
    //     console.log('ready to add to DOM')
    
    //         filteredProjects.forEach( project => {
    //             let p = new Projects(
    //                 project.id, 
    //                 project.name, 
    //                 project.started, 
    //                 project.deadline, 
    //                 project.description,
    //                 project.developer_id
    //             )
    //             p.renderProject() 
    //     }) 
    // }
    


    // //PROJECT SEARCH BAR FOR DEVELOPER
    // static projectSearch() {
    //     let searchBar = document.getElementById('search')
    //     searchBar.innerHTML += 
    //     `
    //         <input type="text" id="search-input" placeholder="Search..">
    //         <button type="submit" id="submitBtn">Submit</button>
    //     `
    //     const submitBtn = document.getElementById("submitBtn")
        
    //     submitBtn.addEventListener('click', (event) => {
    //         console.log(event)
    //         const searchInput = document.getElementById("search-input")
            
    //         let projectsContainer = document.getElementById('projects-container')
    //         if(searchInput.value != "") {
    //             projectsContainer.innerHTML = ""
    //         }
            
    //         let searchTerm = searchInput.value.split(" ").join("+")
    //         if(searchTerm != "") {
    //             fetch(`http://localhost:3000/projects?q=` + searchTerm)
    //             .then(response => response.json())
    //             .then(result => {
    //                 console.log(result)

    //             })
    //         }
    //     })
            

    
    // }   

    // handleSearch(event) {
    //     console.log(event)
    //         let projectsContainer = document.getElementById('projects-container')
    //         projectsContainer.innerHTML = ""
    //         const searchInput = document.getElementById("search-input")
    //         let searchTerm = searchInput.value.split(" ").join("+")
    //         makeApiCall(searchTerm)
    // }
    
    // makeApiCall(searchTerm) {
    //     console.log(searchTerm)
    // }




// searchBar.addEventListener('click', (handleSearchSubmit) => {
//     console.log(event)
//     let searchField = event.target.className
//         if(searchField === "search-input") {
//             console.log('inside search field')
//             const searchInput = document.getElementsByClassName("search-input")
//             let searchTerm = searchInput.value
//         }
//     // let submitBtn = event.target.className
//     // if(submitBtn === "submit") {
//     //     console.log('this is the submit button')
//     //     // let projectsContainer = document.getElementById('projects-container')
//     //     // projectsContainer.innerHTML = ""
        
//     // }



// })