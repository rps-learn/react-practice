import { useState } from "react";
import { useTodos } from "./TodoContext";

function TodoItem({todo}:{todo: any}){
    const { dispatch } = useTodos();
    const [isEditing, setIsEditing] = useState(false);
    const [editableText, setEditableText] = useState(todo.text);

    const handleEditableText = () => {
        if(editableText.trim() !== ""){
            dispatch({ type: "EDIT", id: todo.id, text: editableText });
        }else{
            // if empty, remove todo
            dispatch({ type: "REMOVE", id: todo.id });
        }
        setIsEditing(false);
    }

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
                value={editableText}
                onChange={(e)=> setEditableText(e.target.value)}
                onBlur={handleEditableText} 
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleEditableText();
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
                onClick={()=> dispatch({ type: "TOGGLE", id: todo.id })} 
                onDoubleClick={()=> setIsEditing(true)}
                style={{textDecoration: todo.completed? "line-through":"none"}}>{todo.text}
                </span>
            )}
            &nbsp;
            <span>was created at {formattedDate}</span>
            &nbsp;
            <button onClick={()=> dispatch({ type: "REMOVE", id: todo.id }) }>X</button>
            
        </li>
    );
}


export default TodoItem;