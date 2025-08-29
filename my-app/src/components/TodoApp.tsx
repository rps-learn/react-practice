import { useState } from "react";
import { useTodos } from "./TodoContext";
import TodoItem from "./TodoItem";
import Footer from "./Footer";


function TodoApp(){
    const {todos, addTodo} = useTodos();
    const [input, setInput] = useState("");

    const handleAdd = () => {
        if (input.trim() === "") return;
        addTodo(input);
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