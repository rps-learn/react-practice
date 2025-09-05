import { NavLink } from "react-router-dom";

export default function FilterNav() {
  const baseStyle: React.CSSProperties = {
    marginRight: "10px",
    padding: "4px 8px",
    textDecoration: "none",
    borderRadius: "4px",
    display: "inline-block",
  };

  return (
    <nav aria-label="Main navigation">
      <NavLink
        to="/all"
        style={({ isActive }) => ({
          ...baseStyle,
          background: isActive ? "dodgerblue" : "transparent",
          color: isActive ? "white" : "black",
        })}
      >
        All
      </NavLink>
      <NavLink
        to="/active"
        style={({ isActive }) => ({
          ...baseStyle,
          background: isActive ? "dodgerblue" : "transparent",
          color: isActive ? "white" : "black",
        })}
      >
        Active
      </NavLink>
      <NavLink
        to="/completed"
        style={({ isActive }) => ({
          ...baseStyle,
          background: isActive ? "dodgerblue" : "transparent",
          color: isActive ? "white" : "black",
        })}
      >
        Completed
      </NavLink>
      <NavLink
        to="/about"
        style={({ isActive }) => ({
          ...baseStyle,
          background: isActive ? "dodgerblue" : "transparent",
          color: isActive ? "white" : "black",
        })}
      >
        About
      </NavLink>
      <NavLink
        to="/stats"
        style={({ isActive }) => ({
          ...baseStyle,
          background: isActive ? "dodgerblue" : "transparent",
          color: isActive ? "white" : "black",
        })}
      >
        Stats
      </NavLink>
    </nav>
  );
}
