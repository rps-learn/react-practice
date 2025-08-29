import { useTodos } from "./TodoContext";

function Stats(){
    const { todos } = useTodos();
    const completed = todos.filter((t) => t.completed).length;
    const total = todos.length;
    const remaining = total - completed;

    return(
        <div>
            <h2>Stats</h2>
            <p>
                {total} tasks total
                &nbsp;
                {completed} completed
                &nbsp;
                {remaining} remaining
            </p>
        </div>
    );
}


export default Stats;