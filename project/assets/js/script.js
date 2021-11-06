var tasks=[
  {
    id: 1,
    name: "Add localStorage persistence",
    type:"Web", 
    status: "in progress"
  },
  {
    id:2,
    name:"Learn JavaScript",
    type:"Web",
    status:"in progress"
  },
  {
    id:3,
    name: "Refractor code",
    type:"Web",
    status:"to do"
  }
  ];
var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompleted =document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");


var taskFormHandler = function(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name ='task-name'").value;
  var taskTypeInput = document.querySelector("select[name ='task-type']").value;

  // check if inputs are empty (validate)
  if (taskNameInput === "" || taskTypeInput === "") {
    alert("You need to fill out the task form!");
    return false;
  }
  
  // reset form fields for next task to be entered
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;

  var isEdit = formEl.hasAttribute("data-task-id");

  if(isEdit){
    var taskId =formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput,taskTypeInput,taskId);
  }else{
    var taskDataObj ={
      name: taskNameInput,
      type:taskTypeInput,
      status: "to do"
    };
    createTaskEl(taskDataObj);
  }

};

var createTaskEl = function(taskDataObj) {
  console.log(taskDataObj);
  console.log(taskDataObj.status);
  // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  //add task id as custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  //create task actions( buttons and select) for task
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);
  tasksToDoEl.appendChild(listItemEl);
  
  //we need to add that value as a property to the taskDataObj argument variable
  //and add the entire object to the tasks array
  taskDataObj.id =taskIdCounter;

  tasks.push(taskDataObj);
  //save in local storage
  localStorage.setItem("tasks", tasks);

  //increase task counter for next unique id
  taskIdCounter++;
};

var createTaskActions = function(taskId){
  //create container to hold elements
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-action";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent ="Edit";
    editButtonEl.className ="btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className ="btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id",taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id",taskId);
    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In progress", "Completed"];

    for(var i = 0; i <statusChoices.length; i++){
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.setAttribute("value", statusChoices[i]);
        statusOptionEl.textContent = statusChoices[i];
        
        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }
    return actionContainerEl;
};
 var completeEditTask = function(taskName, taskType,taskId){
   //find task list item with taskId value
   var taskSelected = document.queryselector(".task-item[data-task-id='" =taskId+"']");
  //set mew values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  //loop through tasks array and task object with new content
  for(var i =0; i<tasks.length;i++){
    if(tasks[i].id ===parseInt(taskId)){
      tasks[i].name =taskName;
      tasks[i].type =taskType;
    }
  };
  //save in local storage
  localStorage.setItem("tasks",tasks);
  
  alert("Task Updated!");

  //remove data attributes from form
 formEl.removeAttribute("data-task-id");
 //update formEl button to go back to saying "Add Task" instead of "Edit Task"
 formEl.querySelector("#save-task").textContent = "Add Task";

};

    var editTask = function(taskId){
      console.log(taskId);
      
        //get task list item element
        var taskSelected = document.querySelector(".task-item[data-task-id'" +taskId +"']");
        
        //get content from task name and type
       var taskName = taskSelected.querySelector("h3.task-name").textContent;
       console.log(taskName);

       var taskType = taskSelected.querySelector("span.task-type").textContent;
       console.log(taskType);
       
       //write values of taskname and tasktype to form to be edited
       document.querySelector("input[name='task-name']").value =taskName;
       document.querySelector("select[task-type']").value = taskType;
    
       // set data attribute to the form with a value of the task's id so it knows which one is being edited
       formEl.setAttribute("data-task-id", taskId);
       //update form's button to reflect editing a task rather than creating a new one
       formEl.querySelector("#save-task").textContent = "Save Task";
    
};
taskStatusChangeHandler(){
  //update task's in tasks array
  for(var i=0; i, tasks.length;i++){
    if(tasks[i].id ===parseInt(taskId)){
      tasks[i].status=statusValue;
    }
  }
  //save in local storage
  localStorage.setItem("tasks", tasks);
};


var deleteTask = function(taskId){
  console.log(taskId);
  var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId +"']");
  taskSelected.remove();
  //create a new array to hold update list of tasks
  var updatedTaskArr =[];

  //loop through current tasks
  for(var i =0; i<tasks.length;i++){
    //if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
     if (tasks[i].id !==parseInt(taskId)){
       updatedTaskArr.push(tasks[i]);
     }
  }
  //reassign tasks array to be the same as updateTaskArr
  tasks= updatedTaskArr;
  //save in local storage
  localStorage.setItem("tasks", tasks);
}
var saveTasks = function(){
  localStorage.setItem("tasks", tasks);
}
//create a new task
formEl.addEventListener("submit", taskFormHandler);

//for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

// for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);


