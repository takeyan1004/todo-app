
// Select elements in the DOM 
var taskInput = document.getElementById('new-task'); // element with ID of #new-task 
var addButton = document.getElementsByTagName('button')[0]; // first button on page 
var incompleteTasksHolder = document.getElementById('incomplete-tasks'); // ul with ID #incomplete-tasks 
var completedTasksHolder = document.getElementById('completed-tasks'); // #completed-tasks 

// new task li

var addTask = function(){
console.log("added a task");
//make the lists
var listItem = document.createElement("li");

var checkBox = document.createElement("input");
var label = document.createElement("label");
var editInput = document.createElement("input");
var editButton = document.createElement("button");
var deleteButton = document.createElement("button");
checkBox.type = "checkbox";
editInput.type = "text";

editButton.innerText = "Edit";
editButton.className = "edit";
deleteButton.innerText = "Delete";
deleteButton.className = "delete";

label.innerText = taskInput.value;

listItem.appendChild(checkBox);
listItem.appendChild(label);
listItem.appendChild(editInput);
listItem.appendChild(editButton);
listItem.appendChild(deleteButton);

incompleteTasksHolder.appendChild(listItem);
//bind to each interactivity
bindTaskEvents(listItem, taskCompleted);
　//count Todo tasks and Completed tasks and insert the number
　todo.innerHTML = "Todo: " + incompleteTasksHolder.children.length;
  completed.innerHTML = "Completed: " + completedTasksHolder.children.length;
  //alert function
	alert(taskInput.value+" is newly added to the Todo list！Congrats！");
	taskInput.value = '';
//initialization
taskInput.value = "";
}

// Edit existing tasks 
var editTask = function(){
var listItem = this.parentNode;

var editInput = listItem.querySelector("input[type=text]");
var label = listItem.querySelector("label");
var containsClass = listItem.classList.contains("editMode");

if(containsClass){
label.innerText = editInput.value;
}else{
editInput.value = label.innerText;
}

listItem.classList.toggle("editMode");

};

// Delete tasks

var deleteTask = function(){
var listItem = this.parentNode;
listItem.parentNode.removeChild(listItem);

todo.innerHTML = "Todo: " + incompleteTasksHolder.children.length;
completed.innerHTML = "Completed: " + completedTasksHolder.children.length;
}

// Mark tasks as complete  
var taskCompleted = function(){

	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
	
	todo.innerHTML = "Todo: " + incompleteTasksHolder.children.length;
    completed.innerHTML = "Completed: " + completedTasksHolder.children.length;
}

// Mark tasks as incomplete 
var taskIncomplete = function(){

	var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    
    todo.innerHTML = "Todo: " + incompleteTasksHolder.children.length;
    completed.innerHTML = "Completed: " + completedTasksHolder.children.length;
}

// set click handler to the addTask function (wiring)
addButton.onclick = addTask; //

//connect each button to each function
var bindTaskEvents = function(taskListItem, checkBoxEventHandler){

var checkBox = taskListItem.querySelector("input[type=checkbox]");
var editButton = taskListItem.querySelector("button.edit");
var deleteButton = taskListItem.querySelector("button.delete");

editButton.onclick = editTask;
deleteButton.onclick = deleteTask;
checkBox.onchange = checkBoxEventHandler;

};

// loop over incompleteTasksHolder ul
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
		// bind events to li children (taskCompleted)
}

// loop over completedTasksHolder ul
for (var i = 0; i < completedTasksHolder.children.length; i++) {
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
		// bind events to li children (taskIncomplete)
}

var todo = document.getElementsByTagName("h3")[0];

var completed = document.getElementsByTagName("h3")[1];

todo.innerHTML = "Todo: " + incompleteTasksHolder.children.length;

completed.innerHTML = "Completed: " + completedTasksHolder.children.length;
