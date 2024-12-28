
import { useState } from "react";
import { TaskType, TodolistThree } from "./TodolistThree";
import { v1 } from "uuid";

/* 
-реализована работа чекбокса при нажатитии:
добавлена функция changeStatus (принимает два аргумента: id такски и boolean от чекбокса)
функция меняет статус таски и через копию массива обновляет локальный стейт
прокидывается фуекци в тудулист и в чекбоксе создается событие onChange={onChangeHandler} в todolist к нему присабачивается функция

-предотвращение добавления таски без текста
добавляем логику в todolist в вынесенной функции addtask: если пустая  строка делаем return (прерывание функции)

-добавляем сообщение об required когда пользователь не может нажать добавлене пустой строки
добавляем стили на error (стили срабатывают когда пользователь пытается ввести таску без названия)
добавляем текст под кнопку +
стили через условный рендеринг + локальный стейт ошибки error (так как error может быть может не быть)
в addTask добавляется else {setError("Title is required")} - если пустая строка в стейт пойдет сообщение об ошибке

-при выскавании ошибки на попытку ввода пустой строки - убрать ошибку при наборе букв:
в функцию обраотчика букв onKeyPressHandler:
setError(null);

-реализация подсвечивания нажой кнопки фильтра:
добавяем стили и пкализуем их в кнопку по условию
прокидываем через пропсы значене filter в todolist для реализации условия:
{props.filter === "all" ? "active-filter" : ""} 

*/



export type FilterValuesType = "all" | "completed" | "active"

export function AppThree() {
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

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId) //true или false
        
        //проверка на undefined
        if (task) { //проверка на undefined так если не найдет элемент find возвращает undefined
            task.isDone = isDone; //checbox - отдает значение при клике на противоположное значение так как он меняет значение при клике поэтому если получить его знасение это уже провоположное значение и не надо писать !isDone
        }
        
        //передаеим копию массива с изменением чтобы react перерисовалд данные (так как если передать тот же массив с одной измененной таской ничего не поменяется)
        setTasks([...tasks]);


/*         Когда вы ищете задачу с помощью tasks.find(t => t.id === taskId), вы получаете ссылку на объект задачи, а не копию этого объекта. Это означает, что любые изменения, которые вы вносите в этот объект, будут отражены в исходном массиве tasks.
 */   
      /*  через map */
       /*  let newTasks: Array<TaskType> = tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        setTask(newTasks) */

} 

    //передаем через пропсы в todolist там через кнопуи фуекция булет вызвана
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
        <div className="AppThree Box">
            <TodolistThree
                title="Todolist add working checkbox"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}
