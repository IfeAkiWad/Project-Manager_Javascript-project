let allDevelopers;

class Developer {
        constructor(id, dev_name) {
        this.id = id
        this.dev_name = dev_name
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
       }).then(console.log(allDevelopers))
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
            <button data-id=${devDiv.id} class="dev-btn">Welcome back, ${this.dev_name}!</button>
            `
        developerDiv.appendChild(devDiv)

        devDiv.addEventListener('click', (event) => {
            // iterate over all developers and for each developer render all their projects
            console.log(event) 
            console.log("inside devDiv aka button's parent element")
            
            let devBtn = event.target.className
            if(devBtn === "dev-btn") {
                console.log(`inside devBtn ${this.id}` )
                let projectsContainer = document.getElementById('projects-container')
                projectsContainer.innerHTML = ""
                allDevelopers.forEach(d => {
                    if (d.id == this.id) {
                        console.log(d.projects[0])
                        let projects = d.projects
                        let projectsContainer = document.getElementById('projects-container')
                        projectsContainer.append(projects)
                    }
                })












                // once this button is clicked and triggered the event,
                // all of the projects belonging to the specific developer
                // should render onto the DOM in the "project container".
                
            //    this.devProject.forEach(i => {
            //                 i.projectAppend()
            //     })
                
                // the form to create a project should also create with 
                // the  appropriate developer ID.
            
            }
        }) 
    }

    get devProject() { //ERROR: not defined - scope issue?
        return Projects.all.filter(p => {p.developer_id == this.id})
    }

    // let projectsContainer = document.getElementById('projects-container')
                // projectsContainer.innerHTML = ""

    //     // in category.js, there is a getter method written called items that filters through Item.all,
            //     //  to select ones with a given category_id. this  would be a category object. 
            //     // so this.items would return all of the items for "this" category
            // //    for(const project of devProject) {
            // //        project.projectAppend()
            // //    }
            //     this.devProject.forEach(i => {
            //         i.projectAppend()
            //     })

    // devProjects(event) {
    //     console.log(event)
    //     let devBtn = event.target.classname
    //     if(devBtn === "dev-btn") {

    //         console.log("inside devProjects")
    //         let projectsContainer = document.getElementById('projects-container')
    //         projectsContainer.innerHTML = ""
    //         // in category.js, there is a getter method written called items that filters through Item.all,
    //         //  to select ones with a given category_id. this  would be a category object. 
    //         // so this.items would return all of the items for "this" category
    //     //    for(const project of devProject) {
    //     //        project.projectAppend()
    //     //    }
    //         // devProject.forEach(i => {
    //         //     i.projectAppend()
    //         // })
    //     }
    //     // debugger
    //     // alert(project.message)
    // }
}