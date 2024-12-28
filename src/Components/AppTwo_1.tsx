import { useState } from "react";

import { v1 } from "uuid";
import { TaskType, TodolistPre } from "./TodolistTwo_1";


export type  FilterValuesType = "all" | "completed" | "active";

export function AppTwo_1() {
    
    let [tasks, setTask] = useState<Array<TaskType>>([
        { id: v1(), title: "CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "React", isDone: false }
    ])

    const removeTask = (taskId: string) => {
        let filteredTasks = tasks.filter(t => t.id !== taskId);
        setTask(filteredTasks);
    }

    const addTask = (title: string) => {
        let newTask = {
            id: v1(), 
            title: title, 
            isDone: false
        }
        
        setTask([newTask, ...tasks])
    }


    let [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    }

    let taskForTodolist = tasks;
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(t => t.isDone === true)
    } 
    if (filter === 'active') {
        taskForTodolist = tasks.filter(t => t.isDone === false)
    } 

    return (
        <div className="AppTwo_1 Box">
            <TodolistPre 
            title="What to learn" 
            tasks={taskForTodolist} 
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            />
        </div>
    );
}