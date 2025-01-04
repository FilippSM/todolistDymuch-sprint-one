import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./AppFive"
import { AddItemForm } from "./copm_TodolistFive/AddItemForm"


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}


type PropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>
    /*  tasks: TaskType[] - запись идентична*/
    removeTask: (d: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, toddolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export function TodolistFive(props: PropsType) {
    const onAllCilckHandler = () => {
        props.changeFilter("all", props.id);
    }
    const onActiveCilckHandler = () => {
        props.changeFilter("active", props.id);
    }
    const onCompletedCilckHandler = () => {
        props.changeFilter("completed", props.id);
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }


    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolist}>x</button></h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {props.tasks.map(t => {

                    //вынесена функция не самый вверх так как кнопка создается для каждого элемента    
                    const onRemoveHandler = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id) //получение чекнутого значения
                    }

                    return (
                        <li key={t.id} className={t.isDone ? "is-done" : ""}> {/* если таска не выполнена- обесцвечивание */}
                            <input type="checkbox"
                                onChange={onChangeHandler}
                                checked={t.isDone} />
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? "active-filter" : ""} onClick={onAllCilckHandler}>All</button>
                <button className={props.filter === 'active' ? "active-filter" : ""} onClick={onActiveCilckHandler}>Active</button>
                <button className={props.filter === 'completed' ? "active-filter" : ""} onClick={onCompletedCilckHandler}>Completed</button>
            </div>
        </div>
    )
}