const taskInput = document.querySelector('#taskInput');
const form = document.getElementById('form');
const alertError = document.getElementById('alertError');
const todoItems = document.querySelector('#todoItems');
displayTask()

form.addEventListener('submit', (e) => {
    if (taskInput.value) {
        alertError.innerText = '';
        let task = taskInput.value.trim();
        let taskList = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
        taskList.unshift(task);
        localStorage.setItem('tasks', JSON.stringify(taskList));
        taskInput.value = '';
        displayTask()
    }
    else {
        alertError.innerText = 'Please Enter A Task';
    }
    e.preventDefault();
})


function displayTask() {
    let taskList = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    let lists = '';
    for (let item of taskList) {
        lists += `<li class="list-group-item list-group-item-action list-group-item-primary mt-2">
        ${item} <span class="fa-solid fa-xmark float-right mt-1"></span>`;
    }
    todoItems.innerHTML = lists;
}

todoItems.addEventListener('click', (e) => {
    let taskList = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    let parentElem = e.target.parentElement.innerText;
    if (e.target.classList.contains('fa-xmark')) {
        taskList = taskList.filter((task) => {
            return task !== parentElem;
        })
        localStorage.setItem('tasks', JSON.stringify(taskList));
        displayTask()
    }
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        localStorage.clear();
        displayTask()
    }
})




