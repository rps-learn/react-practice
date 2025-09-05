import { useTodos } from "./TodoContext";
import { useEditTodo } from "../hooks/useEditTodo";
import { motion } from "framer-motion";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
};

function TodoItem({ todo, search = "" }: { todo: Todo; search?: string }){
    const { toggleTodo, removeTodo } = useTodos();
    const { editText, setEditText, isEditing, startEditing, cancelEditing, saveEditing } = useEditTodo(todo.id, todo.text);

    // Highlight match
    const renderText = () => {
        if (!search) return todo.text;

        const regex = new RegExp(`(${search})`, "gi");
        const parts = todo.text.split(regex);

        return parts.map((part, i) =>
        part.toLowerCase() === search.toLowerCase() ? (
            <mark key={i} style={{ backgroundColor: "yellow" }}>{part}</mark>
        ) : (
            part
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
                <motion.div 
                onClick={()=> toggleTodo(todo.id)} 
                onDoubleClick={() => startEditing()}
                style={{textDecoration: todo.completed? "line-through":"none"}}
                animate={{ scale: todo.completed ? 0.9 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                    <span>
                        {renderText()}
                    </span>
                   
                    &nbsp;
                    <span>was created at {formattedDate}</span>
                    &nbsp;
                    <button onClick={()=> removeTodo(todo.id) }>X</button>
                </motion.div>

            )}
            
            
            
        </li>
    );
}


export default TodoItem;