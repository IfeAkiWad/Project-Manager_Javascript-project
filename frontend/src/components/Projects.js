class Projects {
    constructor(id, name, started, deadline, description, developer_Id) {
        this.id = id
        this.name = name
        this.started = started
        this.deadline = deadline
        this.description = description
        this.developer_Id = developer_Id
        this.updateProject
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
            <input type="submit" data-id=${this.id} class="edit" id="edit" value="Edit Project">
        </ul><br>
        `
    }

    static editProject() {
        const projectParentNode = document.getElementById('projects-container')
        projectParentNode.addEventListener('click', (event) => { //to access each project's edit button
            console.log('is this working?')
            console.log(event)
            const editBtn = document.getElementById('edit')
            if(editBtn) {
                console.log('inside edit button')
                let editProject = document.getElementById("form")
                editProject.innerHTML += // ERROR: Do not know how to clear form after appending.
                                              // ERROR: Do not even know if the project object can be updated yet 
                `
                <form id='form'>
                <h2 id="form-header"> Edit project! </h2><br>
                <label for="name">Project Name:</label>
                <input type="text" class="name" id="name"><br><br>
                <label for="started">Project Started:</label>
                <input type="date" class="started" id="started"><br><br>
                <label for="deadline">Project Deadline:</label>
                <input type="date" class="deadline" id="deadline"><br><br>
                <label for="description">Project Description:</label><br><br>
                <textarea id="description"></textarea><br><br>
                <input type="submit" class="submit" data-id=value="Update Project">
                
                </form>
                `
                editProject.addEventListener("submit", updateProject(event))
            }
        })
    }
    // callback function for editProject()
    static updateProject(event) {
        event.preventDefault()
        let name = document.getElementById("name").value
        let started = document.getElementById("started").value
        let deadline = document.getElementById("deadline").value
        let description = document.getElementById("description").value
        let userInput = {
            name: name, 
            started: started,
            deadline: deadline,
            description: description
        };
        fetch('http://localhost:3000/projects', { 
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Accept': 'application/json'
                },
                body: JSON.stringify(userInput)
        })
            .then(response => response.json())
            .then(project => {
                const {id, name, started, deadline, description, developer_id} = project
               let p = new Projects(id, name, started, deadline, description, developer_id)
                    p.renderProject()
            })
        
            // let updateProject = document.getElementById("project")
            // updateProject.reset()
    }
}
