
import { useState } from "react";
import { TaskType, TodolistTwo } from "./TodolistTwo";
import { v1 } from "uuid";


export type FilterValuesType = "all" | "completed" | "active"

export function AppTwo() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "React", isDone: false },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "React", isDone: false }
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let newTask = {
            id: v1(), 
            title: title, 
            isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }
    //передаем через пропсы в todolist там через кнопку фукция булет вызвана
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
        <div className="AppTwo Box">
            <TodolistTwo
                title="Todolist add add task"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}
