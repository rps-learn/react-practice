import { useTodos } from "./TodoContext";

function Footer(){
    const { todos } = useTodos();
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
        </div>
    );
}


export default Footer;