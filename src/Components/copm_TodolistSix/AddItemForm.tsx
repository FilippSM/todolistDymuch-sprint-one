import { ControlPoint } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
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
        <TextField
            value={newTaskTitle}
            variant={'outlined'}
            label={'Type value'}
            onChange={onNewTitleChangeHandler}
            onKeyUp={onKeyPressHandler}
            error={!!error}  /* если есть ошибка ввода пустой строки отрисуй  */
            helperText={error}
        />
        <IconButton onClick={addTask} color={'primary'}>
            <ControlPoint/>
        </IconButton>
    </div>
}