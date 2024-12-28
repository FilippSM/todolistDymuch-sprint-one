import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./AppOne"

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}


type PropsType = {
    title: string,
    tasks: Array<TaskType>
    /*  tasks: TaskType[] - запись идентична*/
    removeTask: (d: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function TodolistTwo(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState(""); //локальный стейт введенной таски в инпут при нажатии на кнопку отправялется в app в бизнес часть

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)/*  e.currentTarget.value - значение из input, e.currentTarget - элемент с которым произошло событие*/
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.key === "Enter") {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
        }
    };

    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle("");
    };

    const onAllCilckHandler = () => {
        props.changeFilter("all")
    }
    const onActiveCilckHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedCilckHandler = () => {
        props.changeFilter("completed")
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyUp={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
                <ul>
                    {props.tasks.map(t => {

                        //вынесена функция не самый вверх так как кнопка создается для каждого элемента    
                        const onRemoveHandler = () => {
                            props.removeTask(t.id)
                        }        

                        return (
                            <li key={t.id}><input type="checkbox" checked={t.isDone} />
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button onClick={onAllCilckHandler}>All</button>
                    <button onClick={onActiveCilckHandler}>Active</button>
                    <button onClick={onCompletedCilckHandler}>Completed</button>
                </div>
            </div>
        </div>
    )
}
