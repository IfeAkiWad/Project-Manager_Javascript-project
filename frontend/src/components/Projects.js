class Projects {
    constructor(id, name, started, deadline, description, developer_Id) {
        this.id = id
        this.name = name
        this.started = started
        this.deadline = deadline
        this.description = description
        this.developer_Id = developer_Id
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
            }

        })
       
    }

    // render project instance to DOM
    renderProject() {
        let projectsDiv = document.getElementById("projects-container")

        projectsDiv.innerHTML +=
        `
        <ul class="ul-project" id="project">
            <h2>Project Name: ${this.name}</h2>
            <h3>Project Started: ${this.started}</h3>
            <h3>Project deadline: ${this.deadline}</h3>
            <h4>Project Description:</h4>
            <p>${this.description}</p>
            <input type="submit" name="Delete" data-id=${this.id} class="delete" value="Delete Project">
        </ul><br>
        `
        // projectsDiv.addEventListener('click', (event) => {
        //     if (document.getElementsByClassName('delete')) this.deleteProject(event)
            // HOW TO DELETE ELEMENT WITHOUT RELOADING PAGE
        // })
        
    }

     //delete button
     static deleteProject() {
        const projectParentNode = document.getElementById('projects-container')
        projectParentNode.addEventListener('click', (event) => { //to access each project's delete button
            console.log('inside parent node')
            console.log(event)
            const deleteBtn = document.getElementsByClassName('delete')
            if(deleteBtn) {
                console.log('inside delete button')
                console.log(event)
                window.alert("project deleted")
                const projectId = event.target.dataset.id
                fetch(`http:localhost:3000/projects/${projectId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                })
                .then(() => {
                    let projectContainer = document.querySelector('#project-container') // ERROR: projectContainer null?
                    let project = document.getElementById('project')
                    projectContainer.removeChild(project) //ERROR: Uncaught (in promise) TypeError: Cannot read property 'removeChild' of null
                })
            }
        })
    }   
}
