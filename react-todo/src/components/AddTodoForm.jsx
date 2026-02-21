import { useState } from "react";

export default function AddTodoForm({ onAddTodo }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAddTodo(trimmedTitle);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Add todo form">
      <label htmlFor="new-todo">New todo</label>
      <input
        id="new-todo"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Buy groceries"
      />
      <button type="submit">Add</button>
    </form>
  );
}
