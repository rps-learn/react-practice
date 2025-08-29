import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import TodoApp from "./components/TodoApp";
import About from "./components/About";
import Stats from "./components/Stats";

function App() {

  return (
    <div>
      {/* Navigation */}
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/about" style={{ marginRight: "10px" }}>About</Link>
        <Link to="/stats">Stats</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<TodoApp />} />
        <Route path="/about" element={<About />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </div>
  )
}

export default App
