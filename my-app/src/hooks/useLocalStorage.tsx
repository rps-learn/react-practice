import type { State } from "../components/TodoContext";

export function useLocalStorage(name: string){
    // Load from localStorage on first render
    const initializer = ():State => {
        const saved = localStorage.getItem(name);
        return { todos: saved ? JSON.parse(saved) : []};
    }

  // Save to localStorage whenever todos change
    const setLocalStorage = (value: State) => {
        localStorage.setItem(name, JSON.stringify(value.todos));
    }

    return { initializer, setLocalStorage }
}

