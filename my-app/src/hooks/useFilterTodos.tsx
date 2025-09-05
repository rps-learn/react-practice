import { useMemo } from "react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

type SortOption = "newest" | "oldest" | "az" | "za";

export function useFilterTodos(todos: Todo[], filter: "all" | "active" | "completed", search: string, sort: SortOption) {
  return useMemo(() => {
    let result = todos;

    // 1. Filter by status
    if (filter === "active") result = result.filter(t => !t.completed);
    if (filter === "completed") result = result.filter(t => t.completed);

    // 2. Filter by search
    if (search.trim() !== "") {
      const query = search.toLowerCase();
      result = result.filter(t => t.text.toLowerCase().includes(query));
    }

    // 3. Sorting
    if (sort === "newest") {
      result = [...result].sort((a, b) => b.createdAt - a.createdAt);
    } else if (sort === "oldest") {
      result = [...result].sort((a, b) => a.createdAt - b.createdAt);
    } else if (sort === "az") {
      result = [...result].sort((a, b) => a.text.localeCompare(b.text));
    } else if (sort === "za") {
      result = [...result].sort((a, b) => b.text.localeCompare(a.text));
    }

    return result;

  }, [todos, filter, search, sort]);
}
