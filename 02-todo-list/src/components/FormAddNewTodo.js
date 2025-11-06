import { useState } from "react";
import Button from "./Button";

export default function FormAddNewTodo({ onAddNewTodo }) {
  const [todo, setTodo] = useState("");
  const handleSubmitForm = function (e) {
    e.preventDefault();
    if (!todo) return;
    const id = crypto.randomUUID().slice(-6);
    const newTodo = {
      content: todo,
      complete: false,
      priority: 0,
      id,
    };
    onAddNewTodo(newTodo);
    setTodo("");
  };
  return (
    <form onSubmit={handleSubmitForm} className="form-add-new">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <Button type="submit">Add</Button>
    </form>
  );
}
