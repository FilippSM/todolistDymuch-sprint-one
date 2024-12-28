import { FilterValuesType } from "./AppOne"

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}


type PropsType = {
    title: string,
    tasks: Array<TaskType>
    /*  tasks: TaskType[] - запись идентична*/
    removeTask: (d: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export function TodolistOne(props: PropsType) {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
                <ul>
                    {props.tasks.map(t => {
                        return (
                            <li><input type="checkbox" checked={t.isDone} />
                                <span>{t.title}</span>
                                <button onClick={() => { props.removeTask(t.id) }}>x</button>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button onClick={() => { props.changeFilter("all") }}>All</button>
                    <button onClick={() => { props.changeFilter("active") }}>Active</button>
                    <button onClick={() => { props.changeFilter("completed") }}>Completed</button>
                </div>
            </div>
        </div>
    )
}
