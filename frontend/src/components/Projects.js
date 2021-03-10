class Projects {
    constructor(id, name, started, deadline, description, developer_Id) {
        this.id = id
        this.name = name
        this.started = started
        this.deadline = deadline
        this.description = description
        this.developer_Id = developer_Id
        // this.renderProject()
        this.editProject
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
        <input type="submit" data-id=${this.id} class="edit" id="edit" value="Edit Project">
    </ul><br>
    `

    // first try to make this element iterable by creating an array from this: make a class array, ie: node list. Because for some reason it is only grabbing one element.
    // if that doesn't work, continue working with the botton for that one element, then figure out how to apply it to the others as an array.
    
    // projects.forEach((project) => {
    //     
    //         // debugger
    //     )})
        // console.log(projects)
    }
   
    editProject() {
    //     // the button element wasn't iterable nor was it accessible for all the project ul;
    //     // therefore, the the button element was turned into an empty array. The projects were then 
    //     // pushed into the empty button array.
    //     // event.preventDefault()
        // let projects = Array.from(document.getElementsByClassName("edit"))
        // let projCollection = document.getElementsByClassName("ul-project")
        // projects.push(projCollection)
        // projects.forEach(project => project.addEventListener('submit', (event) => {
        //     console.log(event)
        // }))
       
        // let editBtn = document.getElementsByClassName('edit')
        // editBtn.addEventListener('submit', (event) => {
        //     console.log("I'm in there!")
        //     console.log(event)
        // })

    }

    //  updateProject(event) {
    //     // event.preventDefault();
    //     let name = document.getElementById("name").value
    //     let started = document.getElementById("started").value
    //     let deadline = document.getElementById("deadline").value
    //     let description = document.getElementById("description").value

    //     console.log(name, started, deadline, description)
    //     let project = {
    //         name: name, 
    //         started: started,
    //         deadline: deadline,
    //         description: description,
    //       
    //     };
    //     // debugger
    //     fetch('http://localhost:3000/projects', { 
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify(project)
            
    //     })
    //     .then(response => response.json())
    //     .then(project => {
    //         const {id, name, started, deadline, description, developer_id} = project
    //     let p = new Projects(id, name, started, deadline, description, developer_id)
    //             p.renderProject()
    //         // debugger
    //     })
    // }
      
}

    
