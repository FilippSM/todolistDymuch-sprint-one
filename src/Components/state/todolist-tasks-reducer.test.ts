import { TasksStateType, TodolistType } from "../AppSeven";
import { tasksReducer } from "./tasks-reducer";
import { addTodolistAC, todolistsReducer } from "./todolists-reducer";

test('ids should be equuls', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistType> = [];

    const action = addTodolistAC("new todolist")

    const endTaskState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTaskState);
    const idFromTasks = keys[0];
    const idFromTodolist = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId) 
    expect(idFromTodolist).toBe(action.todolistId) 
})