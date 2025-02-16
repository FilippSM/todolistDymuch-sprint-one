import { useState } from "react";
import { TaskType, TodolistFour } from "./TodolistFour";
import { v1 } from "uuid";

/* 
Реализуем множественный todolist
-инкапсулируем данные в объект
-чтобы каждый тудулст мог на оснве свойг
на основе значения слова фильтр - сделать фильтрацию
- фукции заночсим в return

-фильтрация работает независимо 

-отдельное хранение тасок для двух тудулистов

-делаем map для тудулистов двух
-let tasksForTodolist = tasks - переносим в return;

-переносим filter в return он должен быть индивидуальным
-исправлякм захордкодженное состояние фильтра чтобы работала фильтрация
-передать в тудулист:todolistID

-прописываем логику в changeFilter
-прописываем логику в removeTask
*/


export type FilterValuesType = "all" | "completed" | "active"
type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}


export function AppFour() {
    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        let task = {
            id: v1(),
            title: title,
            isDone: false
        };
        let tasks = tasksObj[todolistId];
        let newTasks = [task , ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId) //true или false
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }
        
    }

    //передаем через пропсы в todolist там через кнопуи фуекция булет вызвана
    function changeFilter(value: FilterValuesType, toddolistId: string) {
        let todolist = todolists.find(tl => tl.id === toddolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    //вынесена генерация ключей чтобы были одинаковые значения в стейте тудулистов и тасок
    let todolistId1 = v1();
    let todolistId2 = v1();


    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        { id: todolistId1, title: "What to learn", filter: "active" },
        { id: todolistId2, title: "What to buy", filter: "completed" }
    ]);

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist);

        delete tasksObj[todolistId];
        setTasks({...tasksObj});
    }


    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            { id: v1(), title: "CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "React", isDone: false },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "React", isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: "book", isDone: true },
            { id: v1(), title: "milk", isDone: true },
        ]   
    });

    return (
        <div className="AppFour Box">
            {todolists.map((tl) => {
                let tasksForTodolist = tasksObj[tl.id];

                if (tl.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                }
                if (tl.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                }

                return <TodolistFour
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                />
            })}
        </div>
    );
}
