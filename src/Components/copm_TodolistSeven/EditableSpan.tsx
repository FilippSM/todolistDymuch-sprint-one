import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

type EditablePropsSpan = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = (props: EditablePropsSpan) => {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState("");

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }

    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <TextField variant="standard" value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus></TextField>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
    }