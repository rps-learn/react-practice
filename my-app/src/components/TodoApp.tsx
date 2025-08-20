import { useState } from "react";

type Todo = {
    id: number;
    text: string;
}

function TodoApp(){
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState("");

    const addTodo = () => {
        if(input.trim() === "") return;
        const newTodo:Todo = {id: Date.now(), text: input};
        setTodos([...todos, newTodo]);
        setInput("");
    }

    const removeTodo = (id:number) => {
        setTodos(todos.filter(todo=> todo.id !== id));
    }

    return(
        <div>
            <h2>My Todo List</h2>
            <input
                type="text"
                value={input}
                onChange={(e)=> setInput(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>

            <ul>
                {
                    todos.map(todo => (
                        <li>
                            {todo.text}
                            <input type="checkbox" id="mark"/>
                            <label htmlFor="mark">Mark as Done</label>
                            <button onClick={()=>removeTodo(todo.id)}>X</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default TodoApp;