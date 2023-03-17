let addTaskButton = document.getElementById("addTask");
let taskContainer = document.getElementById("taskContainer");
let inputField = document.getElementById("inputField");


function addTask(){
    let paragraph = document.createElement("p");
    paragraph.classList.add("task-styling");
    paragraph.innerText = inputField.value;
    taskContainer.appendChild(paragraph);
    paragraph.addEventListener("click",crossOff);
    paragraph.addEventListener("dblclick",remove);
}

function crossOff(){
    this.style.textDecoration = "line-through";
    this.style.textDecorationColor = "red";
}

function remove(){
    taskContainer.removeChild(this);
}

function init(){
    addTaskButton.addEventListener("click",addTask);
}

init();

