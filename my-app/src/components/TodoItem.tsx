import { useTodos } from "./TodoContext";

function TodoItem({todo}:{todo: any}){
    const { toggleTodo, removeTodo} = useTodos();
    
    const formattedDate = new Date(todo.createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });

    return(
        <li>
            <span onClick={()=>toggleTodo(todo.id)} style={{textDecoration: todo.completed? "line-through":"none"}}>{todo.text}</span>
            &nbsp;
            <span>was created at {formattedDate}</span>
            &nbsp;
            <button onClick={()=>removeTodo(todo.id)}>X</button>
        </li>
    );
}


export default TodoItem;