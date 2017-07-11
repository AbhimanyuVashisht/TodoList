/**
 * Created by av on 11/7/17.
 */


let todos = [];
let todoListElement;

function Todo(task, done) {
    this.task = task;
    this.done = done;
}
$(function () {
    let btnAdd = $('#btn-add-todo');
    let btnClean = $('#btn-clear-done');
    let inputNewTodo = $('#input-new-todo');
    todoListElement = $('#todoList-container');

    refreshTodos(true);

    btnAdd.click(function () {
        addTodo(inputNewTodo.val());
    })
});

function refreshTodos(firstPageLoad = false) {
    if(!firstPageLoad){
        saveTodos();
    }
    if(!todoListElement){
        return;
    }
    retrieveTodos();
    todoListElement.empty();
    for(i in todos){
        let todoItem = createTodoListItem(i);
        todoListElement.append(todoItem);
        console.log(todoItem);
    }
}

function createTodoListItem(i) {
    let todoItem = $(`<li data-id="${i}" class="list-group-item">${todos[i].task}</li>`);
    return todoItem;
}

function retrieveTodos() {
    let savedTodos = localStorage.getItem('todos');
    if(savedTodos){
        todos = JSON.parse(savedTodos);
    }
}


function saveTodos() {
    // Storing the list everyTime with any update in it
    localStorage.setItem("todos", JSON.stringify(todos));
}
function addTodo(todoTask) {
    todos.push(new Todo(todoTask, false));
    refreshTodos();
}