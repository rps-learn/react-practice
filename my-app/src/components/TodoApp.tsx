import { useState } from "react";
import { useTodos } from "./TodoContext";
import TodoItem from "./TodoItem";
import Footer from "./Footer";

type Filter = "all" | "active" | "completed";

function TodoApp(){
    const {todos, dispatch} = useTodos();
    const [input, setInput] = useState("");
    const [filter, setFilter] = useState<Filter>("all");

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
            />
            <button onClick={handleAdd}>Add</button>

            {/* Filter Buttons */}
            <div style={{ margin: "10px 0" }}>
                <button onClick={() => setFilter("all")} disabled={filter === "all"}>
                All
                </button>
                <button onClick={() => setFilter("active")} disabled={filter === "active"}>
                Active
                </button>
                <button onClick={() => setFilter("completed")} disabled={filter === "completed"}>
                Completed
                </button>
            </div>

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
            <Footer/>
        </div>
    );
}

export default TodoApp;