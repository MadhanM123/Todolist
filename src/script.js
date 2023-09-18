let addTaskButton = document.getElementById("addTask");
let clearButton = document.getElementById("clearTasks");
let taskContainer = document.getElementById("taskContainer");
let inputField = document.getElementById("inputField");
let infoBox = document.getElementById("infobox");

let taskList = [];


function addTask(){
    if(localStorage.getItem(inputField.value) != null){
        alert("DO NOT DUPLICATE");
        inputField.value = "";
        return;
    }

    let paragraph = document.createElement("p");
    paragraph.classList.add("task-styling");
    paragraph.innerText = inputField.value;
    taskContainer.appendChild(paragraph);

    taskList.push(inputField.value);
    let taskStr = JSON.stringify(taskList);
    localStorage.setItem("tasklist", taskStr);
    localStorage.setItem(inputField.value, "blank");

    paragraph.addEventListener("click",crossOff);
    paragraph.addEventListener("dblclick",remove);
    infoBox.style.visibility = "hidden";
    inputField.value = "";
}

function crossOff(){
    this.style.textDecoration = "line-through";
    this.style.textDecorationColor = "red";
    localStorage.setItem(this.innerText, "cross");
}

function remove(){
    taskContainer.removeChild(this);
    let ind = taskList.findIndex((element) => {
        return element === this.innerText;
    });

    taskList.splice(ind, 1);
    localStorage.removeItem(this.innerText);
    let taskStr = JSON.stringify(taskList);
    localStorage.setItem("tasklist", taskStr);
}

function clearTasks(){
    if(localStorage.length > 0){
        localStorage.clear();
        taskContainer.innerHTML = "";
        taskList = [];
    }
}

function init(){
    addTaskButton.addEventListener("click",addTask);
    clearButton.addEventListener("click",clearTasks);
    inputField.addEventListener("keyup",function(event){
        if(event.key == "Enter"){
            addTask();
        }
    });

    if(localStorage.length == 0){
        localStorage.setItem("tasklist", taskList);
    }

    console.log(localStorage.length);
    console.log(localStorage.getItem("tasklist"));

    if(localStorage.length > 1){
        let taskStr = localStorage.getItem("tasklist");
        taskList = JSON.parse(taskStr);
        console.log(taskList);

        taskList.forEach(element => {
            let paragraph = document.createElement("p");
            paragraph.classList.add("task-styling");
            paragraph.innerText = element;

            if(localStorage.getItem(element) === "cross"){
                paragraph.style.textDecoration = "line-through";
                paragraph.style.textDecorationColor = "red";
            }

            taskContainer.appendChild(paragraph);
            paragraph.addEventListener("click",crossOff);
            paragraph.addEventListener("dblclick",remove);
            infoBox.style.visibility = "hidden";
            inputField.value = "";
        });
    }
}

init();

