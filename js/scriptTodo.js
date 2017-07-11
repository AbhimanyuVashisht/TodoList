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

// Refresh the TodoList
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
    }
}

// Delete the particular Todo
function deleteTodo(ev) {
    let todoId = $(ev.target).parent().attr('data-id');
    todos.splice(todoId,1);
    refreshTodos();
}

// Move TodoUp in the List
function moveTodoUp(ev) {
    let todoId = ($(ev.target).parent().attr('data-id'));
    todos.splice((todoId-1),0,todos.splice(todoId,1)[0]);
    refreshTodos();
}

// Move TodoDown in the List
function moveTodoDown(ev) {
    let todoId = ($(ev.target).parent().attr('data-id'));
    todos.splice((todoId+1),0,todos.splice(todoId,1)[0]);
    refreshTodos();
}

// Create the List Element with EventListeners
function createTodoListItem(i) {
    let todoItem = $(`<li data-id="${i}" class="list-group-item"></li>`);
    todoItem.append($(`<input type="checkbox" class="col-1">`).attr('checked',todos[i].done));
    todoItem.append($(`<span class="col-8">${todos[i].task}</span>`));
    todoItem.append($(`<i class="fa fa-remove col-1 delete"></i>`)
        .click(deleteTodo));
    todoItem.append($(`<i class="fa fa-chevron-up col-1 icn-move"></i>`)
        .click(moveTodoUp));
    todoItem.append($(`<i class="fa fa-chevron-down col-1 icn-move"></i>`)
        .click(moveTodoDown));

    return todoItem;
}

// Retrieve Todos from the LocalStorage
function retrieveTodos() {
    let savedTodos = localStorage.getItem('todos');
    if(savedTodos){
        todos = JSON.parse(savedTodos);
    }
}

// Save Todos to the Local Storage
function saveTodos() {
    // Storing the list everyTime with any update in it
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Add Todos to the List
function addTodo(todoTask) {
    todos.push(new Todo(todoTask, false));
    refreshTodos();
}