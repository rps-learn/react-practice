import React, { createContext, useContext, useReducer } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type State = {
  todos: Todo[];
};

type Action =
  | { type: "ADD"; text: string }
  | { type: "TOGGLE"; id: number }
  | { type: "CLEAR_COMPLETED" };

const TodoContext = createContext<{
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  clearCompleted: () => void;
} | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD":
      return {
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.text, completed: false },
        ],
      };
    case "TOGGLE":
      return {
        todos: state.todos.map((t) =>
          t.id === action.id ? { ...t, completed: !t.completed } : t
        ),
      };
    case "CLEAR_COMPLETED":
      return { todos: state.todos.filter((t) => !t.completed) };
    default:
      return state;
  }
}

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { todos: [] });

  const addTodo = (text: string) => dispatch({ type: "ADD", text });
  const toggleTodo = (id: number) => dispatch({ type: "TOGGLE", id });
  const clearCompleted = () => dispatch({ type: "CLEAR_COMPLETED" });

  return (
    <TodoContext.Provider value={{ todos: state.todos, addTodo, toggleTodo, clearCompleted }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos must be inside TodoProvider");
  return ctx;
}
