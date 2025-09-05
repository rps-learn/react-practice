import React, { useState } from "react";
import { useTodos } from "./TodoContext";
import TodoList from "./TodoList";

export default function TodoApp({ filter }: { filter: "all" | "active" | "completed" }) {
  const { todos, addTodo, clearCompleted } = useTodos();
  const [text, setText] = useState("");

  return (
    <div>
      <input
        placeholder="Enter todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          if (text.trim()) {
            addTodo(text);
            setText("");
          }
        }}
      >
        Add
      </button>

      <TodoList filter={filter} />

      {todos.some((t) => t.completed) && (
        <button onClick={clearCompleted}>Clear Completed</button>
      )}
    </div>
  );
}
