import { useTodos } from "./TodoContext";
import { useEditTodo } from "../hooks/useEditTodo";
import { motion } from "framer-motion";
import React from "react";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

type TodoItemProps = {
  todo: Todo;
  search?: string;
};

function TodoItem({ todo, search = "" }: TodoItemProps){
    const { toggleTodo, removeTodo } = useTodos();
    const { 
        editText,
        setEditText,
        isEditing,
        startEditing,
        cancelEditing,
        saveEditing 
    } = useEditTodo(todo.id, todo.text);

    // Highlight match
    const renderText = () => {
        if (!search) return todo.text;

        const regex = new RegExp(`(${search})`, "gi");
        const parts = todo.text.split(regex);

        return parts.map((part, i) =>
        part.toLowerCase() === search.toLowerCase() ? (
            <mark key={i} style={{ backgroundColor: "yellow" }}>{part}</mark>
        ) : (
            <React.Fragment key={i}>{part}</React.Fragment>
        )
        );
    };

    const formattedDate = new Date(todo.createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });

    return(
        <li style={{ marginBottom: "8px", listStyle: "none" }} 
            role="listitem"
            data-testid={`todo-${todo.id}`}
        >
             <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                aria-label={`Mark "${todo.text}" as ${todo.completed ? "not done" : "done"}`}
            />
            {isEditing ? (
                <input 
                    type="text" 
                    autoFocus
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={saveEditing} 
                    onKeyDown={(e) => {
                        if (e.key === "Enter") saveEditing();
                        if (e.key === "Escape") cancelEditing();
                    }}
                    aria-label={`Editing todo "${todo.text}"`}
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
                <motion.span 
                    style={{
                        textDecoration: todo.completed ? "line-through" : "none",
                        marginLeft: "8px",
                        cursor: "pointer",
                        display: "inline-block",
                    }}
                    onDoubleClick={startEditing}
                    animate={{ scale: todo.completed ? 0.95 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    aria-label={todo.text}
                >
                    <span>
                        {renderText()}
                    </span>
                   
                    &nbsp;
                    <span><small>({formattedDate})</small></span>
                    &nbsp;
                    <button onClick={()=> removeTodo(todo.id) } 
                        aria-label={`Delete "${todo.text}"`}
                        style={{
                            marginLeft: "6px",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "red",
                            fontWeight: "bold", 
                        }}
                    >
                        X
                    </button>
                </motion.span>

            )}
            
            
            
        </li>
    );
}


export default TodoItem;