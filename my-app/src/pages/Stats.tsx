
import { useTodos } from "../components/TodoContext";

function Stats(){
    const { todos } = useTodos();
    const completed = todos.filter((t) => t.completed).length;
    const total = todos.length;
    const remaining = total - completed;

    return(
        <div>
            <h2>Statistics</h2>
            <p>Total tasks: {total}</p>
            <p>Completed: {completed}</p>
            <p>Remaining: {remaining}</p>
        </div>
    );
}


export default Stats;