import { useTodos } from "./TodoContext";
import { motion, AnimatePresence } from "framer-motion";

function Footer(){
    const { todos, clearCompleted } = useTodos();
    const completed = todos.filter((t) => t.completed).length;
    const total = todos.length;
    const remaining = total - completed;

    return(
        <div>
            <p>
                {total} tasks total
                &nbsp;
                {completed} completed
                &nbsp;
                {remaining} remaining
            </p>
            <AnimatePresence>
                {completed > 0 && (
                <motion.button
                    onClick={clearCompleted}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    style={{
                    background: "tomato",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    }}
                >
                    Clear Completed
                </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}


export default Footer;