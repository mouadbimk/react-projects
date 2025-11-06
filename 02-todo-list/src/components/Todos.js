import { useState } from "react";
import Sort from "./Sort";
import Todo from "./Todo";

export default function Todos({ todos, onDelete, onComplete, onReset }) {
  const [sortBy, setSortBy] = useState("default");
  const sortedFunctions = {
    default: (a, b) => 0,
    title: (a, b) => a.content.localeCompare(b.content),
    complete: (a, b) => Number(b.complete) - Number(a.complete),
  };
  const sortedTodos = todos.slice().sort(sortedFunctions[sortBy]);
  return (
    <>
      <ul className="todos">
        {todos &&
          sortedTodos.map((todo) => (
            <Todo
              onDelete={onDelete}
              todo={todo}
              key={todo.id}
              onComplete={onComplete}
            />
          ))}
      </ul>
      {todos.length > 2 && <Sort onReset={onReset} setSortBy={setSortBy} />}
    </>
  );
}
