import { useState } from "react";
import AddTodoForm from "./AddTodoForm.jsx";

const initialTodos = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Build a Todo List", completed: true },
  { id: 3, title: "Write tests", completed: false },
];

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

  const handleAddTodo = (title) => {
    setTodos((prevTodos) => {
      const nextId =
        prevTodos.reduce((max, todo) => Math.max(max, todo.id), 0) + 1;
      return [...prevTodos, { id: nextId, title, completed: false }];
    });
  };

  const handleToggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <section>
      <h1>Todo List</h1>

      <AddTodoForm onAddTodo={handleAddTodo} />

      <ul aria-label="Todo items">
        {todos.map((todo) => (
          <li key={todo.id}>
            <button
              type="button"
              onClick={() => handleToggleTodo(todo.id)}
              aria-label={`Toggle ${todo.title}`}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                marginRight: "0.75rem",
              }}
            >
              {todo.title}
            </button>

            <button
              type="button"
              onClick={() => handleDeleteTodo(todo.id)}
              aria-label={`Delete ${todo.title}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
