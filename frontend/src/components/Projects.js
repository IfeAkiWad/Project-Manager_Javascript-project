class Projects {
    static all = []

    constructor(id, name, started, deadline, description, developer_id) {
        this.id = id
        this.name = name
        this.started = started
        this.deadline = deadline
        this.description = description
        this.developer_id = developer_id

        Projects.all.push(this)
    }

        // to get projects index
    static getAllProjects() {
        fetch('http://localhost:3000/projects')
        .then((response) => response.json()) //returns the content from the response to the request.
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
            }

        })
       
    }

    // render project instance to DOM
    renderProject() {
        let projectsContainer = document.getElementById("projects-container")
        let projectsDiv = document.createElement(`project-div-${this.developer_id}`)
        let projectsDivAttr = document.createAttribute('class')
        projectsDivAttr.value = 'proj-div'
        projectsDiv.setAttributeNode(projectsDivAttr)
        projectsDiv.innerHTML +=
        `
        <ul class="ul-project" id='project-${this.id}' data-id=${this.id} data-id=${this.developer_id}>
            <li data-id=${this.id} id="project">
                <h2>Project Name: ${this.name}</h2>
                <h3>Project Started: ${this.started}</h3>
                <h3>Project deadline: ${this.deadline}</h3> 
                <h4>Project Description:</h4>
                <p>${this.description}</p>
                <input type="submit" name="delete" data-id=${this.id} class="delete" value="Delete Project">
            </li>
        </ul><br>
        `
        projectsContainer.appendChild(projectsDiv)
    }

     //delete button
     static deleteProject() {
        const projectParentNode = document.getElementById('projects-container')
        projectParentNode.addEventListener('click', (event) => { //to access each project's delete button
            console.log('inside parent node')
            console.log(event)
            let deleteEvent = event.target.className
            if(deleteEvent === 'delete') {
                console.log('inside delete button')
                console.log(event)
                let projectId = parseInt(event.target.dataset.id)
                let configObj = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
                fetch(`http://localhost:3000/projects/${projectId}`, configObj)
                .then(response => { //returns the content from the response.
                  return response.json()
                }) 
                .then(project => { // Use this data inside of `json` to do DOM manipulation
                    console.log(project)
                    alert(project.message)
                    let projectDelete = document.getElementById(`project-${projectId}`)
                    projectDelete.remove()
                })

            }
        })  
    }  
    
    
}
