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
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function TodolistThree(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null); //для добавления ошибки, перерисовки ошибки

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)/*  e.currentTarget.value - значение из input*/
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null) //убрираем надпись которая выскакивает при ошибке если начал вводить буквы
        if (e.ctrlKey && e.key === "Enter") {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
        }
    };

    const addTask = () => {
        //защита от ввода  пустой строки
        if (newTaskTitle.trim() !== "") { //защита  от введения пустой строки
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle("");
        } else {
            setError("Title is required")
        }

        /* 
        //такой вариант удобно использовать  если много подрят проверок if идет
        if (newTaskTitle.trim() === "") {
            return
        }

        props.addTask(newTaskTitle.trim());
        setNewTaskTitle(""); */
    };

    const onAllCilckHandler = () => {
        props.changeFilter("all");
    }
    const onActiveCilckHandler = () => {
        props.changeFilter("active");
    }
    const onCompletedCilckHandler = () => {
        props.changeFilter("completed");
    }



    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyUp={onKeyPressHandler}
                    className={error ? "error": ""}  /* если есть ошибка ввода пустой строки отрисуй  */
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>} {/* если есть ошибка ввода пустой строки отрисуй */}
                <ul>
                    {props.tasks.map(t => {

                        //вынесена функция не самый вверх так как кнопка создается для каждого элемента    
                        const onRemoveHandler = () => {
                            props.removeTask(t.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked) //получение чекнутого значения
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
                    <button className={props.filter === 'all'? "active-filter" : ""} onClick={onAllCilckHandler}>All</button>
                    <button className={props.filter === 'active'? "active-filter" : ""} onClick={onActiveCilckHandler}>Active</button>
                    <button className={props.filter === 'completed'? "active-filter" : ""} onClick={onCompletedCilckHandler}>Completed</button>
                </div>
            </div>
        </div>
    )
}
