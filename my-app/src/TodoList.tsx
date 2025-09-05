import React from "react";
import TodoItem from "./TodoItem";
import { useTodos } from "./TodoContext";

export default function TodoList({ filter }: { filter: "all" | "active" | "completed" }) {
  const { todos } = useTodos();

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <ul>
      {filtered.map((t) => (
        <TodoItem key={t.id} {...t} />
      ))}
    </ul>
  );
}
