class Developer {
    constructor(id, dev_name, projects) {
        this.id = id
        this.dev_name = dev_name
        this.projects = projects
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
                        developer.dev_name,
                        developer.projects
                    )
                    d.renderDeveloper()
                }
        })
    
    }

    // render developer instance to DOM
    renderDeveloper() {
        let developerDiv = document.getElementById("developer-container")

        developerDiv.innerHTML +=
        `
        
    <h2>Welcome back, ${this.dev_name}!</h2>
  
    `
    }

    // devsProjects() {

    // }

}