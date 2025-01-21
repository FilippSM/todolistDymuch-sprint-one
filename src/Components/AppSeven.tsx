import { useState } from "react";
import { v1 } from "uuid";


import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Container, Grid2, Paper } from "@mui/material";
import { TaskType, TodolistSeven } from "./TodolistSeven";
import { AddItemForm } from "./copm_TodolistSeven/AddItemForm";




export type FilterValuesType = "all" | "completed" | "active"
type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

//add todolist
//делаем функцию AddItemForm для добавления nelekbcnjd
//AddItemForm - в другую компоненту, универсвотная компонета добавляет таску, тудулист
//в App <input/> <button>x</button> меняем  на подключение AddItemForm
//добавляем addTodoList для добавдения тудулиста
//создаем функцию которая делает input из спана
//добавляем EditableSpan

export function AppSeven() {
    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({ ...tasksObj });
    }

    function addTask(title: string, todolistId: string) {
        let task = {
            id: v1(),
            title: title,
            isDone: false
        };
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({ ...tasksObj });
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId) //true или false
        if (task) {
            task.isDone = isDone;
            setTasks({ ...tasksObj });
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId) //true или false
        if (task) {
            task.title = newTitle;
            setTasks({ ...tasksObj });
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
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]);

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist);

        delete tasksObj[todolistId];
        setTasks({ ...tasksObj });
    }

    const changeTodolistTitle = (taskId: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id === taskId);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }
    }


    let [tasksObj, setTasks] = useState<TasksStateType>({
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
            { id: v1(), title: "book", isDone: true },
            { id: v1(), title: "milk", isDone: true },
            { id: v1(), title: "book", isDone: true },
            { id: v1(), title: "milk", isDone: true },
            { id: v1(), title: "book", isDone: true },
            { id: v1(), title: "milk", isDone: true },
        ]
    });

    const addTodoList = (title: string) => {
        let todoList: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodolists([todoList, ...todolists])
        setTasks({
            ...tasksObj,
            [todoList.id]: []
        })
    }


    return (
        <div className="AppSeven">
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Button color="inherit">Sign in</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid2 container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodoList} />
                </Grid2>
                <Grid2 container spacing={6}>
                    {todolists.map((tl) => {
                        let tasksForTodolist = tasksObj[tl.id];

                        if (tl.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                        }
                        if (tl.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                        }

                        return <Grid2>
                            <Paper style={{padding: "10px"}}>
                                <TodolistSeven
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid2>
                    })}
                </Grid2>
            </Container>
        </div>
    );
}
