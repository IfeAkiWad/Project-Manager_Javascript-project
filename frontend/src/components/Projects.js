class Projects {
    constructor(id, name, started, deadline, description, completed, developer_Id) {
        this.id = id
        this.name = name
        this.started = started
        this.deadline = deadline
        this.description = description
        this.completed = completed
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
                    project.completed,
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
     <ul class="ul-project">
        <h2>Project Name: ${this.name}</h2>
        <h3>Project Started: ${this.started}</h3>
        <h3>Project deadline: ${this.deadline}</h3>
        <h4>Project Description:</h4>
        <p>${this.description}</p>
        <h3>Project Completed: ${this.completed}</h3><br>
        <input type="submit" class="edit" value="Edit Project">
    </ul><br>
    `
    }   

    // updateProjectForm(event) {
    //     event.preventDefault();
    //     let name = document.getElementById("name").value
    //     let started = document.getElementById("started").value
    //     let deadline = document.getElementById("deadline").value
    //     let description = document.getElementById("description").value
    //     let completed = document.getElementById("completed").value
        
    //     console.log(name, started, deadline, description, completed)
    //     let project = {
    //         name: name, 
    //         started: started,
    //         deadline: deadline,
    //         description: description,
    //         completed: completed
    //     };
    
    //     // once form submitted => fetch PATCH request to backend
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
    //         const {id, name, started, deadline, description, completed, developer_id} = project
    //        let p = new Projects(id, name, started, deadline, description, completed, developer_id)
    //             p.renderProject()
    //         // debugger
    //     })
    // }
}