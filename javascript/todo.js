//  function showTodos (){
    
    // document.getElementById("output").innerHTML = table
// }
const setTodosInLocalStorage = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos))
}
const showOutput = (output) => {
    document.getElementById("output").innerHTML = output;
}
function clearOutput (){
    document.getElementById("output").innerHTML = ""
}
const setFieldValue = (fieldID, value) => {
    return document.getElementById(fieldID).value = value
}
const getFieldValue = (fieldID) => {
    return document.getElementById(fieldID).value
}
const fieldValue =(title, location, description) => {
    console.log(fieldValue)
}
function emptyFieldValue  (){
    document.getElementById("title").value = ""
     document.getElementById("location").value = ""
      document.getElementById("description").value = ""
}
const getRandomID = () => {
    return Math.random().toString(36).slice(2)
}
const deleteTodo = (event) => {
  let todoId = event.target.getAttribute('data-value')
  const todos = JSON.parse(localStorage.getItem("todos"));

  function confirmation() {
    if (confirm("Are you sure you want to delete?")) {
      let todosAfterDelete = todos.filter((todo) => {
        return todo.id !== todoId
      })
      localStorage.setItem("todos", JSON.stringify(todosAfterDelete));
      showSuccess("A todo has been successfully deleted.");
      showTodo()
       } else {
      return
    }
  }
  confirmation()
}

  



 

//edittodo
const editTodo = (event) => {
    let todoId = event.target.getAttribute('data-value')
    const todos = JSON.parse(localStorage.getItem("todos"));
    let todo = todos.find((todo) => {
        return todo.id === todoId
    })
    console.log(todo)
    
    const {title, location, description} = todo
    setFieldValue("title", title)
    setFieldValue("location", location)
    setFieldValue("description", description)

    localStorage.setItem("todoForEdit", JSON.stringify(todo))
    document.getElementById("addTaskButton").style.display = "none"
    document.getElementById("updateTaskButton").style.display = "block"
}
const showSuccess = (msg) => {
    Toastify({
        text: msg,
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "left", 
        stopOnFocus: true, 
        style: {
          background: "linear-Gradient(to right,rgb(23, 139, 98),rgb(127, 230, 165))",
        },
      }).showToast();
}
const showError = (msg) => {
    Toastify({
        text: msg,
        duration: 3000,
        close: true,
        gravity: "bottom", 
        position: "left", 
        stopOnFocus: true, 
        style: {
          background: "linear-Gradient(to right,rgb(147, 41, 30),rgb(213, 42, 62))",
        },
      }).showToast();
}
const handleSubmit = () => {
    event.preventDefault();
    let title = getFieldValue("title"), location = getFieldValue("location"), description = getFieldValue("description")
    title = title.trim();
    location = location.trim();
    description = description.trim();
    if(title.length < 3){
        showError("Please enter a title with at least 3 characters.");
        return;
    }
    if(location.length < 3){
        showError("Please enter a location with at least 3 characters.");
        return;
    }
    if(description.length < 3){
        showError("Please enter a description with at least 3 characters.");
        return;
    }

let todo = {title, location, description}
todo.id = getRandomID();
todo.dateCreated = new Date().getTime();
todo.status = "Active";
const todos = JSON.parse(localStorage.getItem("todos")) || [];
todos.push(todo)
localStorage.setItem("todos", JSON.stringify(todos));
console.log(todos)
showSuccess("A new todo has been successfully added.")
showTodo() 
showOutput(table)
emptyFieldValue()
}
window.handleSubmit = handleSubmit;

// show todo --------------------------------------------------------------------------------------------------
function showTodo () {
 clearOutput()
 const todos = JSON.parse(localStorage.getItem("todos")) || [];
 if (!todos.length){
    showOutput("<h5>Hurray! No task available. Add a task button to add your task.</h5>")
    return;
 }
 let tableStartingCode = '<div class="table-responsive"> <table class="table">'
 let tableEndingCode = '</table></div>'
 let tableHead = '<thead><tr><th scope="col">#</th><th scope="col">Title</th><th scope="col">Location</th><th scope="col">Description</th><th scope="col">Action</th> </tr> </thead>'
 let tableBody = '';
 for(i = 0; i < todos.length; i++){
    let todo = todos[i]

tableBody += `
  <tr>
    <th scope="row">${i + 1}</th>
    <td>${todo.title}</td>
    <td>${todo.location}</td>
    <td>${todo.description}</td>
    <td>
      <button class="btn btn-info btn-sm" data-value="${todo.id}" onclick="editTodo(event)">Edit</button>
      <button class="btn btn-danger ms-2 btn-sm" data-value="${todo.id}" onclick="deleteTodo(event)">Delete</button>
    </td>
  </tr>
`;}
 let table = tableStartingCode + tableHead + '<tbody>' + tableBody + '</tbody>' + tableEndingCode;
 showOutput(table)
 emptyFieldValue()
}


const handleEdit = () => {
const todoForEdit = JSON.parse(localStorage.getItem("todoForEdit"))
let updatedTitle = getFieldValue("title")
let updatedLocation = getFieldValue("location")
let updatedDescription = getFieldValue("description")
const updatedTodo = {...todoForEdit, title: updatedTitle, location: updatedLocation, description: updatedDescription}

updatedTodo.dateModified = new Date().getTime()



const todos = JSON.parse(localStorage.getItem("todos"))
const updatedTodos = todos.map((todo) => {
  if (todo.id === updatedTodo.id) {
    return updatedTodo
  }
  return todo
})

localStorage.setItem("todos", JSON.stringify(updatedTodos))
localStorage.removeItem("todoForEdit") // Remove the todoForEdit item from local storage

showSuccess("Todo updated successfully.")
showTodo() // Display the updated todo list
document.getElementById("addTaskButton").style.display = "block"
document.getElementById("updateTaskButton").style.display = "none"
emptyFieldValue() 
}



window.onload = function() {

    showTodo()
}
