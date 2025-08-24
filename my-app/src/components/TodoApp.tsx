import { useState, useEffect } from "react";

type Todo = {
    id: number;
    text: string;
    completed: boolean;
}

function TodoApp(){
    const [todos, setTodos] = useState<Todo[]>(()=>{
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved): [];
    });
    const [input, setInput] = useState("");

    useEffect(()=> {
        localStorage.setItem("todos", JSON.stringify(todos));
    },[todos]);


    const addTodo = () => {
        if(input.trim() === "") return;
        const newTodo:Todo = {id: Date.now(), text: input, completed: false};
        setTodos([...todos, newTodo]);
        setInput("");
    }

    const removeTodo = (id:number) => {
        setTodos(todos.filter(todo=> todo.id !== id));
    }

    const toggleCompleted = (id:number) => {
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
                            <span onClick={()=>toggleCompleted(todo.id)} style={{textDecoration: todo.completed? "line-through":"none"}}>{todo.text}</span>
                            &nbsp;
                            <button onClick={()=>removeTodo(todo.id)}>X</button>
                        </li>
                    ))
                }
            </ul>
            <div>
                Number of Todos: {todos.length}
            </div>
        </div>
    );
}

export default TodoApp;