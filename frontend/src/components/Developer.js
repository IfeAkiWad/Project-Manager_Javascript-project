let allDevelopers;

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
    }
   
// RENDER DEVELOPER INSTANCE ONTO DOM
    renderDeveloper() {
        let developerDiv = document.getElementById("developer-container")
        let devDiv = document.createElement("div")
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
                projectsContainer.innerHTML = ""
                allDevelopers.forEach(d => {
                    if (d.id == this.id) {
                        let projects = d.projects
                        projects.forEach(proj => {
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
