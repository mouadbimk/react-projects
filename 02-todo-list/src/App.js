import { useEffect, useState } from "react";
import FormAddNewTodo from "./components/FormAddNewTodo";
import Todos from "./components/Todos";
const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];
export default function App() {
  const [todos, setTodos] = useState(initialTodos);

  const handleAddNewTodo = function (todo) {
    setTodos((todos) => [...todos, todo]);
  };
  const handleDeleteTodo = function (id) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };
  const handleCompleteTodo = function (id) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  };
  const handleReset = function () {
    const confirmed = window.confirm(
      "Are you sure you want to delete all Items?"
    );
    if (!confirmed) return;
    setTodos([]);
    localStorage.removeItem("todos");
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <div className="app">
      <h1>Todo List App</h1>
      <FormAddNewTodo onAddNewTodo={handleAddNewTodo} />
      <Todos
        onReset={handleReset}
        todos={todos}
        onDelete={handleDeleteTodo}
        onComplete={handleCompleteTodo}
      />
    </div>
  );
}
