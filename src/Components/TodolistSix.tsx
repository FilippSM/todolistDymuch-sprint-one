import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./AppFive"
import { AddItemForm } from "./copm_TodolistSix/AddItemForm"
import { EditableSpan } from "./copm_TodolistSix/EditableSpan"
import { Button, Checkbox, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"


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
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void

    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (taskId: string, newTitle: string) => void
}

export function TodolistSix(props: PropsType) {
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
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }


    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle}></EditableSpan>
                <IconButton onClick={removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <div>
                {props.tasks.map(t => {

                    //вынесена функция не самый вверх так как кнопка создается для каждого элемента    
                    const onRemoveHandler = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id) //получение чекнутого значения
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id) //получение чекнутого значения
                    }


                    return (
                        <div key={t.id} className={t.isDone ? "is-done" : ""}> {/* если таска не выполнена- обесцвечивание */}
                            <Checkbox
                                onChange={onChangeStatusHandler}
                                checked={t.isDone} />
                            {/* <span>{t.title}</span> */}
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
                            <IconButton onClick={onRemoveHandler}>
                                <Delete />
                            </IconButton>
                        </div>
                    )
                })}
            </div>
            <div>
                <Button variant={props.filter === 'all' ? "contained" : "text"} onClick={onAllCilckHandler}>All</Button>
                <Button color={'success'} variant={props.filter === 'active' ? "contained" : "text"} onClick={onActiveCilckHandler}>Active</Button>
                <Button color={'secondary'} variant={props.filter === 'completed' ? "contained" : "text"} onClick={onCompletedCilckHandler}>Completed</Button>
            </div>
        </div>
    )
}