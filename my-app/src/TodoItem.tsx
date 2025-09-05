import React from "react";
import { useTodos } from "./TodoContext";

type TodoItemProps = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoItem({ id, text, completed }: TodoItemProps) {
  const { toggleTodo } = useTodos();

  return (
    <li data-testid={`todo-${id}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTodo(id)}
        aria-label={`mark "${text}" as done`}
      />
      <span>{text}</span>
    </li>
  );
}
