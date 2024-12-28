import { TodolistPre } from "./TodolistPre";

export function AppPre() {
    let task1 = [
        { id: 1, title: "CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "React", isDone: false }
    ]

    let task2 = [
        { id: 1, title: "Terminator", isDone: true },
        { id: 2, title: "XXX", isDone: false },
        { id: 3, title: "Lord of the Rings", isDone: true }
    ]

    return (
        <div className="AppPre Box">
            <TodolistPre title="What to learn" tasks={task1} />
            <TodolistPre title="Movies" tasks={task2} />
        </div>
    );
}

