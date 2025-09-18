import { createContext, useContext, useReducer, useEffect} from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

export type State = {
  todos: Todo[];
};

type Action =
  | { type: "ADD"; text: string }
  | { type: "TOGGLE"; id: string }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR_COMPLETED"; }
  | { type: "EDIT"; id: string; text: string };

type TodoContextType = {
  todos: Todo[];
  addTodo : (text: string) => void;
  toggleTodo : (id: string) => void;
  removeTodo : (id: string) => void;
  editTodo : (id: string, text: string) => void;
  clearCompleted : () => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD":
      return {
        todos: [
        ...state.todos,
        { id: uuidv4(), text: action.text, completed: false, createdAt: Date.now() },
      ],
      }
    case "TOGGLE":
      return {
        todos: state.todos.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      ),
      }
    case "REMOVE":
      return {todos: state.todos.filter(todo => todo.id !== action.id),}
    case "CLEAR_COMPLETED":
      return {todos: state.todos.filter(todo => !todo.completed),}
    case "EDIT":
    return {
      todos: state.todos.map(todo =>
      todo.id === action.id ? { ...todo, text: action.text } : todo
    ),
    }
    default:
      return state;
  }
}



export function TodoProvider({ children }: React.PropsWithChildren) {
  const { initializer, setLocalStorage } = useLocalStorage("todos");
  const [state, dispatch] = useReducer(reducer, { todos: [] }, initializer);

  const value: TodoContextType = {
    todos: state.todos,
    addTodo: (text) => dispatch({ type: "ADD", text }),
    toggleTodo: (id) => dispatch({ type: "TOGGLE", id }),
    removeTodo: (id) => dispatch({ type: "REMOVE", id }),
    editTodo: (id, text) => dispatch({ type: "EDIT", id, text }),
    clearCompleted: () => dispatch({ type: "CLEAR_COMPLETED" }),
  };

  // Save to localStorage whenever todos change
  useEffect(() => {
    setLocalStorage(state);
  }, [state.todos]);

   return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

// 🔹 Custom hook for consuming context
export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within TodoProvider");

  return context;
}