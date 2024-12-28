import { useState } from "react"
import { FilterValuesType } from "./AppTwo_1"


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function TodolistPre(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                onChange={e => {
                    setNewTaskTitle(e.currentTarget.value)
                }}
                onKeyUp={e => {
                    if (e.ctrlKey && e.key === "Enter") {
                        props.addTask(newTaskTitle);
                        setNewTaskTitle("");
                    }
                }}
                />
                <button
                    onClick={() => {
                        props.addTask(newTaskTitle)
                        setNewTaskTitle("")
                    }}
                    >+</button>
                <ul>
                    {props.tasks.map(t => {
                        return (
                            <>
                                <li><input type="checkbox" checked={t.isDone} />
                                    <span>{t.title}</span>
                                    <button onClick={() => props.removeTask(t.id)}>x</button>
                                </li>
                            </>
                        )
                    })}
                </ul>
                <div>
                    <button onClick={() => props.changeFilter("all")}>All</button>
                    <button onClick={() => props.changeFilter("active")}>Active</button>
                    <button onClick={() => props.changeFilter("completed")}>Completed</button>
                </div>
            </div>
        </div>
    )
}