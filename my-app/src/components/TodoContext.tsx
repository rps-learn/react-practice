import { createContext, useContext, useReducer, useEffect, ReactNode} from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
};

type Action =
  | { type: "ADD"; text: string }
  | { type: "TOGGLE"; id: number }
  | { type: "REMOVE"; id: number }
  | { type: "CLEAR_COMPLETED"; }
  | { type: "EDIT"; id: number; text: string };

function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { id: Date.now(), text: action.text, completed: false, createdAt: Date.now() },
      ];
    case "TOGGLE":
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "REMOVE":
      return state.filter(todo => todo.id !== action.id);
    case "CLEAR_COMPLETED":
      return state.filter(todo => !todo.completed);
    case "EDIT":
    return state.map(todo =>
      todo.id === action.id ? { ...todo, text: action.text } : todo
    );
    default:
      return state;
  }
}

type TodoContextType = {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {

  // Load from localStorage on first render
  const initializer = () => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  };

  const [todos, dispatch] = useReducer(todoReducer, [], initializer);

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

// 🔹 Custom hook for consuming context
export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within TodoProvider");
  const { todos, dispatch } = context;

  const addTodo = (text: string) => dispatch({ type: "ADD", text });
  const toggleTodo = (id: number) => dispatch({ type: "TOGGLE", id });
  const removeTodo = (id: number) => dispatch({ type: "REMOVE", id });
  const editTodo = (id: number, text: string) => dispatch({ type: "EDIT", id, text });
  const clearCompleted = () => dispatch({ type: "CLEAR_COMPLETED" });

  return { todos, addTodo, toggleTodo, removeTodo, editTodo, clearCompleted };
}