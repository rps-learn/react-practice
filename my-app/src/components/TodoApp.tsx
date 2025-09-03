import { useTodos } from "./TodoContext";
import TodoItem from "./TodoItem";
import Footer from "./Footer";
import { useInput } from "../hooks/useInput";
import { useFilterTodos } from "../hooks/useFilterTodos";

type Filter = "all" | "active" | "completed";

function TodoApp({filter}:{filter: Filter}){
    const {todos, addTodo} = useTodos();

    const input = useInput("");

    const handleAdd = () => {
        if (input.value.trim() === "") return;
        addTodo(input.value);
        input.reset();
    }

    const filteredTodos = useFilterTodos(todos, filter);

    return(
        <div>
            <h2>My Todo List</h2>
            <input
                type="text"
                value={input.value}
                onChange={input.onChange}
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