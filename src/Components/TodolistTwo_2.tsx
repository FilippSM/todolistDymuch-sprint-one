import { useState } from "react"
import { FilterValuesType } from "./AppTwo_2"
import { Button } from "./comp_TodolistTwo_2/Button"


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
 /*    filter: FilterValuesType */
}

export function TodolistTwo_2(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")


    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle("");
    };


    const changeFilterToAll = () => props.changeFilter("all");
    const changeFilterToActive = () => props.changeFilter("active");
    const changeFilterToCompleted = () => props.changeFilter("completed");

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
                {/* <button onClick={addTask}>+</button> */}
                <Button callBack={addTask} name={"+"}/>

                <ul>
                    {props.tasks.map(t => {

                        const onRemoveHandler = () => {
                            props.removeTask(t.id)
                        }  

                        return (
                            <>
                                <li><input type="checkbox" checked={t.isDone} />
                                    <span>{t.title}</span>
                                   {/*  <button onClick={onRemoveHandler}>x</button> */}
                                    <Button callBack={onRemoveHandler} name={"x"}/>
                                </li>
                            </>
                        )
                    })}
                </ul>
                <div>
                   
                {/*     <button onClick={() => props.changeFilter("all")}>All</button>
                    <button onClick={() => props.changeFilter("active")}>Active</button>
                    <button onClick={() => props.changeFilter("completed")}>Completed</button> */}

                    {/* <button onClick={onChangeFilter}>All</button> */}
                    <Button callBack={changeFilterToAll} name={"All"}/>
                    <Button callBack={changeFilterToActive} name={"active"}/>
                    <Button callBack={changeFilterToCompleted} name={"completed"}/>
                </div>
            </div>
        </div>
    )
}