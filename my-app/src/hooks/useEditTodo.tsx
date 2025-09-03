import { useState } from "react";
import { useTodos } from "../components/TodoContext";

export function useEditTodo(todoId: number, initialText: string) {
    const { editTodo, removeTodo } = useTodos();
    
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(initialText);

    const saveEditing = () => {
        if(editText.trim() !== ""){
            editTodo(todoId, editText);
        }else{
            // if empty, remove todo
            removeTodo(todoId);
        }
        setIsEditing(false);
    }

    const startEditing = () => {
        setIsEditing(true);
        setEditText(initialText);
    }

    const cancelEditing = () => {
        setIsEditing(false);
        setEditText(initialText);
    }

    return { editText, setEditText, isEditing, startEditing, cancelEditing, saveEditing };
}
