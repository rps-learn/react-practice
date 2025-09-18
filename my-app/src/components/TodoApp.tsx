import { useTodos } from "./TodoContext";
import { useUI } from "./UIContext";
import TodoItem from "./TodoItem";
import type { Todo } from "./TodoContext";
import Footer from "./Footer";
import { useInput } from "../hooks/useInput";
import { useFilterTodos } from "../hooks/useFilterTodos";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "../hooks/useDebounce";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function TodoApp(){
    const { pathname } = useLocation();
    const { todos, addTodo } = useTodos();
    const { filter, setFilter, search, sort, setSearch, setSort } = useUI();
    const input = useInput("");
    const debounced = useDebounce(search, 500);

    // 🔑 Sync route with filter
    useEffect(() => {
        if (pathname === "/active") setFilter("active");
        else if (pathname === "/completed") setFilter("completed");
        else setFilter("all");
    }, [pathname, setFilter]);

    const handleAdd = () => {
        if (input.value.trim() === "") return;
        addTodo(input.value.trim());
        input.reset();
    };

    const filteredTodos: Todo[] = useFilterTodos(todos, filter, debounced, sort);

    return(
    <div>
        <h1>Todo List ({filter})</h1>

        {/* Add Todo */}
        <label htmlFor="new-todo" style={{ display: "none" }}>
            Add a new todo
        </label>
        <input
            id="new-todo"
            value={input.value}
            onChange={input.onChange}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Enter todo"
            aria-label="New todo"
        />
        <button onClick={handleAdd} aria-label="Add todo">Add</button>

        {/* Search & Sort Controls */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ marginTop: "10px" }}
        >
            <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search todos..."
            aria-label="Search todos"
            style={{ marginRight: "10px" }}
            />

            {search && (
                <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                style={{
                    marginRight: "10px",
                    background: "lightgray",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    padding: "2px 6px"
                }}
                >
                ❌
                </button>
            )}

            <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="az">A–Z</option>
                <option value="za">Z–A</option>
            </select>
        </motion.div>

        {/* Todo List */}
        <ul style={{ padding: 0 }}>
            <AnimatePresence>
                {filteredTodos.map(todo => (
                <motion.li
                    key={todo.id}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    style={{ listStyle: "none" }}
                >
                    <TodoItem todo={todo} search={debounced}/>
                </motion.li>
                ))}
            </AnimatePresence>
        </ul>

        <Footer />
    </div>
    );
}

export default TodoApp;