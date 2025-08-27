import { useState, useEffect } from "react";

type Todo = {
    id: number;
    text: string;
    completed: boolean;
    createdAt: number;
}

function TodoItem({todo, onToggleCompleted, onRemoveTodo}:
    {
        todo: Todo;
        onToggleCompleted: (id: number) => void;
        onRemoveTodo: (id: number) => void;
    }
    
){
    const formattedDate = new Date(todo.createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });

    return(
        <li>
            <span onClick={()=>onToggleCompleted(todo.id)} style={{textDecoration: todo.completed? "line-through":"none"}}>{todo.text}</span>
            &nbsp;
            <span>was created at {formattedDate}</span>
            &nbsp;
            <button onClick={()=>onRemoveTodo(todo.id)}>X</button>
        </li>
    );
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
        const newTodo:Todo = {id: Date.now(), text: input, completed: false, createdAt: Date.now()};
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
                        <TodoItem
                            todo={todo}
                            onToggleCompleted={toggleCompleted}
                            onRemoveTodo={removeTodo}
                        />
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