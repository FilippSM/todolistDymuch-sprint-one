import { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    /* id: string */
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null); //для добавления ошибки, перерисовки ошибки
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)/*  e.currentTarget.value - значение из input*/
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null) //убрираем надпись которая выскакивает при ошибке если начал вводить буквы
        if (e.ctrlKey && e.key === "Enter") {
            addTask();
        }
    };

    const addTask = () => {
        //защита от ввода  пустой строки
        if (newTaskTitle.trim() !== "") { //защита  от введения пустой строки
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle("");
        } else {
            setError("Title is required")
        }
    };


    return <div>
        <input
            value={newTaskTitle}
            onChange={onNewTitleChangeHandler}
            onKeyUp={onKeyPressHandler}
            className={error ? "error" : ""}  /* если есть ошибка ввода пустой строки отрисуй  */
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>} {/* если есть ошибка ввода пустой строки отрисуй */}
    </div>
}