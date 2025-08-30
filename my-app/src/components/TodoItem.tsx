import { useTodos } from "./TodoContext";

function TodoItem({todo}:{todo: any}){
    const { dispatch } = useTodos();

    const formattedDate = new Date(todo.createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });

    return(
        <li>
            <span onClick={()=> dispatch({ type: "TOGGLE", id: todo.id }) } style={{textDecoration: todo.completed? "line-through":"none"}}>{todo.text}</span>
            &nbsp;
            <span>was created at {formattedDate}</span>
            &nbsp;
            <button onClick={()=> dispatch({ type: "REMOVE", id: todo.id }) }>X</button>
        </li>
    );
}


export default TodoItem;