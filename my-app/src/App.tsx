import { Routes, Route, Link, NavLink } from "react-router-dom";
import "./App.css";
import TodoApp from "./components/TodoApp";
import About from "./components/About";
import Stats from "./components/Stats";

function App() {

  return (
    <div>
      {/* Navigation */}
      <nav style={{ marginBottom: "20px" }}>
        <NavLink
          to="/"
          end   // important: makes "/" active only on exact match
          style={({ isActive }) => ({
            marginRight: "10px",
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "tomato" : "black"
          })}
        >
          Home
        </NavLink>

        <NavLink
          to="/active"
          end   // important: makes "/" active only on exact match
          style={({ isActive }) => ({
            marginRight: "10px",
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "tomato" : "black"
          })}
        >
          Active
        </NavLink>

        <NavLink
          to="/completed"
          end   // important: makes "/" active only on exact match
          style={({ isActive }) => ({
            marginRight: "10px",
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "tomato" : "black"
          })}
        >
          Completed
        </NavLink>

        <NavLink
          to="/about"
          end   // important: makes "/" active only on exact match
          style={({ isActive }) => ({
            marginRight: "10px",
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "tomato" : "black"
          })}
        >
          About
        </NavLink>

        <NavLink
          to="/stats"
          end   // important: makes "/" active only on exact match
          style={({ isActive }) => ({
            marginRight: "10px",
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "tomato" : "black"
          })}
        >
          Stats
        </NavLink>

      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<TodoApp filter="all"/>} />
        <Route path="/active" element={<TodoApp filter="active"/>} />
        <Route path="/completed" element={<TodoApp filter="completed"/>} />
        <Route path="/about" element={<About />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </div>
  )
}

export default App
