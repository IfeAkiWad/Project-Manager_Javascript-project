// class ProjectForm {
//  static projectForm = document.getElementById("project-form")

//     constructor(id) {
//         this.id = id
//         this.newProjectForm()
//     }

//     // create form
//      newProjectForm() {
//         // let projectForm = document.getElementById("project-form")

//         projectForm.innerHTML +=
//         `
//         <form>
//         <label for="name">Project Name:</label>
//         <input type="text" id="name"><br><br>
//         <label for="started">Project Started:</label>
//         <input type="date" id="started"><br><br>
//         <label for="deadline">Project Deadline:</label>
//         <input type="date" id="deadline"><br><br>
//         <label for="description">Project Description:</label><br>
//         <textarea id="description"></textarea><br><br>
//         <label for="completed">Project Completed:</label>
//         <input type="checkbox" id="completed" value=0><br><br>
//         <input type="submit" value="New Project">
//         </form>
        
//         `
//         // add event listener 
//         projectForm.addEventListener("submit", submitProjectForm)
//     }

//      submitProjectForm() {
//         event.preventDefault();
//         let name = document.getElementById("name").value
//         let started = document.getElementById("started").value
//         let deadline = document.getElementById("deadline").value
//         let description = document.getElementById("description").value
//         let completed = document.getElementById("completed").value

//         // console.log(name, started, deadline, description, completed)
//         let project = {
//             name: name, 
//             started: started,
//             deadline: deadline,
//             description: description,
//             completed: completed
//         };
//         // once form submitted => fetch post request to backend
//         // error: not processing data
//         fetch(`${BASE_URL}/developers/${this.developer_id}/projects`, { 
//             method: "POST",
//             headers: {
//                 // 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify( { project } )
        
//         })
//         .then(response => response.json())
//         .then(project => {
//             let p = new Projects(
//                 project.id,     
//                 project.name, 
//                 project.started,
//                 project.deadline,
//                 project.description,
//                 project.completed,
//                 project.developer_id)
//             p.renderProject()
//         })
//         // debugger
//     }
// }