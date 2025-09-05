import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function FilterNav() {
  const location = useLocation();
  const links = [
    { to: "/all", label: "All" },
    { to: "/active", label: "Active" },
    { to: "/completed", label: "Completed" },
    { to: "/about", label: "About" },
    { to: "/stats", label: "Stats" },
  ];

  return (
    <nav
      aria-label="Main navigation"
      style={{
        display: "flex",
        gap: "16px",
        position: "relative",
        marginBottom: "16px",
      }}
    >
      {links.map((link) => {
        const isActive = location.pathname === link.to;
        return (
          <div key={link.to} style={{ position: "relative" }}>
            <NavLink
              to={link.to}
              style={{
                textDecoration: "none",
                color: isActive ? "dodgerblue" : "black",
                fontWeight: isActive ? "bold" : "normal",
                padding: "4px 8px",
              }}
            >
              {link.label}
            </NavLink>

            {isActive && (
              <motion.div
                layoutId="underline"
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: -2,
                  height: 3,
                  borderRadius: 2,
                  background: "dodgerblue",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
