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
        <Route path="/all" element={<TodoApp filter="all" />} />
        <Route path="/active" element={<TodoApp filter="active" />} />
        <Route path="/completed" element={<TodoApp filter="completed" />} />
        <Route path="/about" element={<About />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </div>
  )
}

export default App
