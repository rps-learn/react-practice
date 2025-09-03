import { useTodos } from "./TodoContext";
import { useEditTodo } from "../hooks/useEditTodo";

function TodoItem({todo}:{todo: any}){
    const { toggleTodo, removeTodo } = useTodos();
    const { editText, setEditText, isEditing, startEditing, cancelEditing, saveEditing } = useEditTodo(todo.id, todo.text);

    const formattedDate = new Date(todo.createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });

    return(
        <li>
            {isEditing ? (
                <input type="text" 
                autoFocus
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={saveEditing} 
                onKeyDown={(e) => {
                    if (e.key === "Enter") saveEditing();
                    if (e.key === "Escape") cancelEditing();
                }}
                style={{
                marginLeft: "8px",
                padding: "2px 4px",
                border: "1px solid dodgerblue",
                borderRadius: "4px",
                outline: "none",
                fontSize: "1em"
                }}
                />
            ):(
                <span 
                onClick={()=> toggleTodo(todo.id)} 
                onDoubleClick={() => startEditing()}
                style={{textDecoration: todo.completed? "line-through":"none"}}>{todo.text}
                </span>
            )}
            &nbsp;
            <span>was created at {formattedDate}</span>
            &nbsp;
            <button onClick={()=> removeTodo(todo.id) }>X</button>
            
        </li>
    );
}


export default TodoItem;