class Developer {
    constructor(id, dev_name) {
        this.id = id
        this.dev_name = dev_name
    }

    static getDeveloper() {
        fetch('http://localhost:3000/developers')
        .then((response) => response.json())
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

    get devProject() { //ERROR: not defined - scope issue?
        Projects.all.filter((p) => p.developer_id == this.id)
    }

    projectAppend() {
        let projectsContainer = document.getElementById('projects-container')
        let projectsDiv = document.getElementsByClassName('proj-div')
        projectsContainer.appendChild(projectsDiv)
    }

    // render developer instance to DOM
    renderDeveloper() {
        let developerDiv = document.getElementById("developer-container")
        let devDiv = document.createElement("div")
        // devDiv.dataset.id = this.id 
        devDiv.id = `${this.id}`
        devDiv.innerHTML +=
            ` 
            <button data-id=${devDiv.id}>Welcome back, ${this.dev_name}!</button>
            `
        developerDiv.appendChild(devDiv)

        devDiv.addEventListener('click', this.devProjects)
    }

    devProjects() {
        console.log("inside devProjects")
        let projectsContainer = document.getElementById('projects-container')
        projectsContainer.innerHTML = ""
        // in category.js, there is a getter method written called items that filters through Item.all,
        //  to select ones with a given category_id. this  would be a category object. 
        // so this.items would return all of the items for "this" category
       for(const project of devProject) {
           project.projectAppend()
       }
        // devProject.forEach(i => {
        //     i.projectAppend()
        // })
        debugger
        // alert(project.message)
    }
}