let button = document.getElementById("add");
let todoList = document.getElementById("todoList");
let input = document.getElementById("input");

let todos = [];
window.onload = () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => addTodo(todo));
};

button.addEventListener("click", () => {
  todos.push(input.value);
  localStorage.setItem("todos", JSON.stringify(todos));
  addTodo(input.value);
  input.value = "";
});

function addTodo(todo) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todoItem");

  let check = new Image();
  check.src = "image/unchecked.png";
  todoItem.appendChild(check);
  let isCheck = true

  let para = document.createElement("p");
  para.innerHTML = todo;
  todoItem.appendChild(para);

  check.addEventListener("click", () => {
    if(isCheck){
      check.src = "image/checked.png";
      para.style.textDecoration = "line-through";
      remove(todo);
      isCheck = false;
    }
    else{
      check.src = "image/unchecked.png";
      para.style.textDecoration = "none";
      isCheck = true;
    }
  });

  let cancel = document.createElement("span");
  cancel.innerText = "X";
  todoItem.appendChild(cancel);

  cancel.addEventListener("click", () => {
    todoItem.removeChild(cancel);
    todoItem.removeChild(para);
    todoItem.removeChild(check);
    remove(todo);
  });

  todoList.appendChild(todoItem);
}

function remove(todo) {
  let index = todos.indexOf(todo);
  if (index > -1) {
    todos.splice(index, 1);
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}
