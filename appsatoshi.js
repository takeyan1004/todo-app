// Problem: UI doesn't provide desired results (nothing happens when you click things)
// Solution: Add interactivity so user can manage their daily tasks 

// Plan! 

// Select elements in the DOM 
var taskInput = document.getElementById('new-task'); // element with ID of #new-task 
var addButton = document.getElementsByTagName('button')[0]; // first button on page 
var incompleteTasksHolder = document.getElementById('incomplete-tasks'); // ul with ID #incomplete-tasks 
var completedTasksHolder = document.getElementById('completed-tasks'); // #completed-tasks 

// new task li
var createNewTaskElement = function(taskString) {
	// create li
	var listItem = document.createElement('li');

	// input (checkbox)
	var checkBox = document.createElement('input'); // checkbox
	// label
	var label = document.createElement('label');
	// edit input (text)
	var editInput = document.createElement('input');
	// button.edit
	var editButton = document.createElement('button');
	// button.delete
	var deleteButton = document.createElement('button');

	// each of these elements needs to be modified and appended
	checkBox.type = "checkbox"; // each element has a type property, refer to style.css 
	editInput.type = "text";

	editButton.innerText = "Edit";  
	editButton.className = "edit";
	deleteButton.innerText = "Delete"; 
	deleteButton.className = "delete";

	label.innerText = taskString;

	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
};

// Add new tasks
var addTask = function(){ // these are all event handlers 
	// console.log("Add task..."); // just checking to see that this event handler function is triggered 
	// create new list item and add it to ul:
	var listItem = createNewTaskElement(taskInput.value);

	// append listItem to incompleteTasksHolder
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	todo.innerHTML = "Todo: " + incompleteTasksHolder.children.length;
    completed.innerHTML = "Completed: " + completedTasksHolder.children.length;
	// change input value to blank string to clear the input field after adding task
	alert(taskInput.value+"が新たに追加されました！いよっ！社畜！");
	taskInput.value = '';

};

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

// Mark tasks complete  
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
addButton.onclick = addTask; // the onclick set to addTask - does not call addTask, just a reference. 
//it will call the function only when the user clicks on the button, not at the onclick assignment    

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
