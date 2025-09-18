import { Routes, Route, Navigate  } from "react-router-dom";
import "./App.css";
import TodoApp from "./components/TodoApp";
import About from "./pages/About";
import Stats from "./pages/Stats";
import FilterNav from "./components/FilterNav";

function App() {

  return (
    <div>
      <h1>React Todo App</h1>
      <FilterNav />

      <Routes>
        <Route path="/" element={<Navigate to="/all" />} />
        <Route path="/all" element={<TodoApp/>} />
        <Route path="/active" element={<TodoApp/>} />
        <Route path="/completed" element={<TodoApp/>} />
        <Route path="/about" element={<About />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </div>
  )
}

export default App
