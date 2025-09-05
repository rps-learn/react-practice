import { useState } from "react";
import { useTodos } from "./TodoContext";
import TodoItem from "./TodoItem";
import Footer from "./Footer";
import { useInput } from "../hooks/useInput";
import { useFilterTodos } from "../hooks/useFilterTodos";
import { motion, AnimatePresence } from "framer-motion";

type Filter = "all" | "active" | "completed";
type SortOption = "newest" | "oldest" | "az" | "za";

function TodoApp({filter}:{filter: Filter}){
    const { todos, addTodo } = useTodos();
    const input = useInput("");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState<SortOption>("newest");

    const handleAdd = () => {
        if (input.value.trim() === "") return;
        addTodo(input.value);
        input.reset();
    };

    const filteredTodos = useFilterTodos(todos, filter, search, sort);

    return(
    <div>
        <h1>Todo List ({filter})</h1>

        {/* Add Todo */}
        <input
            value={input.value}
            onChange={input.onChange}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Enter todo"
        />
        <button onClick={handleAdd}>Add</button>

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
            style={{ marginRight: "10px" }}
            />

            {search && (
                <button
                onClick={() => setSearch("")}
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

            <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="az">A–Z</option>
                <option value="za">Z–A</option>
            </select>
        </motion.div>

        {/* Todo List */}
        <ul>
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
                    <TodoItem todo={todo} search={search}/>
                </motion.li>
                ))}
            </AnimatePresence>
        </ul>

        <Footer />
    </div>
    );
}

export default TodoApp;