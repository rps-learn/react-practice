import { useState } from "react";

type Todo = {
    id: number;
    text: string;
    completed: boolean;
}

function TodoApp(){
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState("");

    const addTodo = () => {
        if(input.trim() === "") return;
        const newTodo:Todo = {id: Date.now(), text: input, completed: false};
        setTodos([...todos, newTodo]);
        setInput("");
    }

    const removeTodo = (id:number) => {
        setTodos(todos.filter(todo=> todo.id !== id));
    }

    const isCompleted = (id:number) => {
        setTodos(todos.map(todo=> (
            todo.id === id ? {...todo, completed: !todo.completed}:todo
        )));
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
                            <span onClick={()=>isCompleted(todo.id)} style={{textDecoration: todo.completed? "line-through":"none"}}>{todo.text}</span>
                            &nbsp;
                            <button onClick={()=>removeTodo(todo.id)}>X</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default TodoApp;