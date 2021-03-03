class Projects {
    constructor(id, name, started, deadline, description, completed, developer_Id) {
        this.id = id
        this.name = name
        this.started = started
        this.deadline = deadline
        this.description = description
        this.completed = completed
        this.developer_Id = developer_Id
        // this.editProject
    }

        // to get projects index
    static getAllProjects() {
        fetch('http://localhost:3000/projects')
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
                    project.completed,
                    project.developer_id)
                p.renderProject()
                // p.editProject()
            }

        })
    
    }

    // editProject(event) {
    //     // //edit each project without triggering a page load. 
    //     // this.preventDefault()
   
    //     let projects = document.querySelector("#edit")
    //         projects.addEventListener('click', console.log("ifeoluwa"))
        
    //         // console.log(projects)
    //     // }
    // }

    // render project instance to DOM
    renderProject() {
        let projectsDiv = document.getElementById("projects-container")

        projectsDiv.innerHTML +=
    `
     <ul class="ul-project">
        <h2>Project Name: ${this.name}</h2>
        <h3>Project Started: ${this.started}</h3>
        <h3>Project deadline: ${this.deadline}</h3>
        <h4>Project Description:</h4>
        <p>${this.description}</p>
        <h3>Project Completed: ${this.completed}</h3><br>
        <input type="submit" class="edit" id="edit" value="Edit Project">
    </ul><br>
    `

    // first try to make this element iterable by creating an array from this: make a class array, ie: node list. Because for some reason it is only grabbing one element.
    // if that doesn't work, continue working with the botton for that one element, then figure out how to apply it to the others as an array.
    let projects = Array.from(document.getElementsByClassName(".edit"))
    // projects.forEach((project) => {
    //     project.addEventListener('click', (e) => {
    //         console.log(projects)
    //     }
    //         // debugger
    //     )})
        console.log(projects)
   
    
      
}

// function editProject() {
//     console.log("ifeoluwa")
//     let projects = document.querySelector("#edit")
    
}