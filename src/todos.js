export let todos = JSON.parse(localStorage.getItem("todos")) || [
  {text: "Complete online JavaScript course" ,completed: true},
  {text: "Jog around the park 3x" ,completed: false},
  {text: "10 minutes meditation",completed: false},
  {text: "Read for 1 hour",completed: false},
  {text: "Pick up groceries",completed: false},
  {text: "Complete Todo App on Frontend Mentor",completed: false},

];
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