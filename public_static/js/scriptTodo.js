/**
 * Created by av on 11/7/17.
 */
let todos = [];
let todoListElement;

$(function () {
    let btnAdd = $('#btn-add-todo');
    let btnClean = $('#btn-clear-done');
    let inputNewTodo = $('#input-new-todo');
    todoListElement = $('#todoList-container');

    refreshTodos();

    btnAdd.click(function () {
        $.post('/todos',{
            task: inputNewTodo.val(),
            done: false
        },function (data) {
            if(data.success){
                refreshTodos();
            }
        })
    })
});

function refreshTodos() {
    if(!todoListElement){
        return;
    }
    $.get('/todos',function (data) {
        todos = data;
        formList();
    })
}

function formList() {
    todoListElement.empty();
    for(i in todos){
        let todoItem = createTodoListItem(i);
        todoListElement.append(todoItem);
    }
}

function deleteTodo(ev) {
    let todoId = $(ev.target).parent().attr('data-id');

}

function createTodoListItem(i) {
    let spanELement = $(`<span class="col-8">${todos[i].task}</span>`);
    if(todos[i].done){
        spanELement.addClass(' todo-done');
    }

    let todoItem = $(`<li data-id="${i}" class="list-group-item"></li>`);
    todoItem.append($(`<input type="checkbox" class="col-1">`).attr('checked',todos[i].done));
    todoItem.append(spanELement);
    todoItem.append($(`<i class="fa fa-remove col-1 delete"></i>`)
        .click(deleteTodo));
    todoItem.append($(`<i class="fa fa-chevron-up col-1 icn-move"></i>`));
    todoItem.append($(`<i class="fa fa-chevron-down col-1 icn-move"></i>`));

    return todoItem;
}