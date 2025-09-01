import { useState } from "react";
import { useTodos } from "./TodoContext";
import TodoItem from "./TodoItem";
import Footer from "./Footer";

type Filter = "all" | "active" | "completed";

function TodoApp({filter}:{filter: Filter}){
    const {todos, dispatch} = useTodos();
    const [input, setInput] = useState("");

    const handleAdd = () => {
        if (input.trim() === "") return;
        dispatch({ type: "ADD", text: input });
        setInput("");
    }

    const filteredTodos = todos.filter(todo => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true; // "all"
    });

    return(
        <div>
            <h2>My Todo List</h2>
            <input
                type="text"
                value={input}
                onChange={(e)=> setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleAdd();
                }}
            />
            <button onClick={handleAdd}>Add</button>

            <ul>
                {
                    filteredTodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                        />
                    ))
                }
            </ul>
            {/* ✅ Hint Text */}
            <p style={{ fontSize: "0.9em", color: "gray", marginTop: "5px" }}>
            💡 Double-click a task to edit
            </p>
            <Footer/>
        </div>
    );
}

export default TodoApp;