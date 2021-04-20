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

    // render developer instance to DOM
    renderDeveloper() {
        let developerDiv = document.getElementById("developer-container")
           let devDiv = document.createElement("div")
           devDiv.id = `${this.id}`
            devDiv.innerHTML +=
                ` 
                <button data-id=${this.id}>Welcome back, ${this.dev_name}!</button>
                `
            developerDiv.appendChild(devDiv)

            devDiv.addEventListener('click', this.devProjects)

    }

    devProjects(event) {
        console.log(event)
        console.log("inside devProjects")
        return Projects.all.filter(p => p.developer_id == this.id)
    }
}