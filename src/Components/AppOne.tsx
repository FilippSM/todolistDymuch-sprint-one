
import { useState } from "react";
import { TaskType, TodolistOne } from "./TodolistOne";


export type FilterValuesType = "all" | "completed" | "active"

export function AppOne() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: 1, title: "CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "React", isDone: false },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "React", isDone: false }
    ]);
    
    let [filter, setFilter] = useState<FilterValuesType>("all");


    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    //передаем через пропсы в todolist там через кнопку функция булет вызвана
    function changeFilter (value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodolist = tasks;
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }


    /* Array<TaskType> - будет работать при экспорте подсказывает написание */
    return (
        <div className="AppOne Box">
            <TodolistOne
                title="Todolist add filter"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

