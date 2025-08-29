import "./App.css";
import { TodoProvider } from "./components/TodoContext";
import TodoApp from "./components/TodoApp";

function App() {

  return (
    <TodoProvider>
      <TodoApp/>
    </TodoProvider>
  )
}

export default App
