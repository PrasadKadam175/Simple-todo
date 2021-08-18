//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const fiterOption = document.querySelector('.filter-todo');

//Event Listners

//calling function when webpage is load
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click', deleteCheck);
fiterOption.addEventListener('click',filterTodo);

//Functions
function addTodo(event){
    //prevent form from submitting
    event.preventDefault();
    // create todo div in html dynamically
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create li dynmically inside above created div
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add todo to localstorage
    savelocalTodos(todoInput.value);
    //add check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //add trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // add main tododiv into to list dynamically
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    // delete todo listitem
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }

    // check mark in todolist
    if(item.classList[0] ==='complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
    
}

function filterTodo(e){
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

function savelocalTodos(todo){
    //check if doto any item is already exist or not
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
        //check if doto any item is already exist or not
        let todos;
        if(localStorage.getItem('todos')===null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        //to iterate to each item created in todo list
        todos.forEach(function(todo){
        // create todo div in html dynamically
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // create li dynmically inside above created div
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //add check button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //add trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        // add main tododiv into to list dynamically
        todoList.appendChild(todoDiv);
            })
}

function removeLocalTodos(todo){
    let todos;
        if(localStorage.getItem('todos')===null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        const todoIndex = todo.children[0].innerText;
        //remove selected indexof element , 1 = number elements tobe removed
        todos.splice(todos.indexOf(todoIndex),1);
        localStorage.setItem('todos',JSON.stringify(todos));
}