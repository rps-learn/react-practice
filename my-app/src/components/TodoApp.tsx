import { useState } from "react";
import { useTodos } from "./TodoContext";
import TodoItem from "./TodoItem";
import Footer from "./Footer";


function TodoApp(){
    const {todos, dispatch} = useTodos();
    const [input, setInput] = useState("");

    const handleAdd = () => {
        if (input.trim() === "") return;
        dispatch({ type: "ADD", text: input });
        setInput("");
    }

    return(
        <div>
            <h2>My Todo List</h2>
            <input
                type="text"
                value={input}
                onChange={(e)=> setInput(e.target.value)}
            />
            <button onClick={handleAdd}>Add</button>

            <ul>
                {
                    todos.map(todo => (
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