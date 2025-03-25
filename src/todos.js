export let todos = JSON.parse(localStorage.getItem("todos")) || [];
export function setTodos(newTodos){
  todos = newTodos;
  saveTodos();
}
export function addTodo(todoText) {
  if (todoText == "") return;
  const newTodo = { text: todoText, completed: false };
  todos.push(newTodo);
  saveTodos();
}

export function removeTodo(index) {
  todos.splice(index, 1);
  saveTodos();
}

export function toggleComplete(index){
  todos[index].completed = !todos[index].completed
  saveTodos();
}

export function clearCompletedTodos(){
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
}

export function saveTodos(){
  localStorage.setItem("todos",JSON.stringify(todos));
}