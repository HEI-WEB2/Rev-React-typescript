import { nanoid } from "nanoid";
import React, { useState, ChangeEvent } from "react";
import "./TaskManager.css";

interface Task {
  id: string;
  title: string;
}

 const TaskManager: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const completeTask = (id: string): void => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, taskUpdate: Partial<Task>): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...taskUpdate } : task
      )
    );
  };

  const addTask = (): void => {
    if (title.length < 1) {
      return;
    }

    const newTask: Task = {
      id: nanoid(),
      title,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTitle("");
  };

  const handleSearch = (ev: ChangeEvent<HTMLInputElement>): void => {
    setSearchKeyword(ev.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search Task"
        />
      </div>

      <div className="task">
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="container">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                placeholder="Add new task"
                value={task.title}
                onChange={(e) => updateTask(task.id, { title: e.target.value })}
              />
              <button onClick={() => completeTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;