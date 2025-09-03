import { useMemo } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
};

export function useFilterTodos(todos: Todo[], filter: "all" | "active" | "completed") {
  return useMemo(() => {
    return todos.filter(todo => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true; // "all"
    });
  }, [todos, filter]);
}
