import { useState } from "react";
import { nanoid } from "nanoid";

interface Task {
  id: string;
  title: string;
}

interface TaskManager {
  title: string;
  searchKeyword: string;
  tasks: Task[];
  completeTask: (id: string) => void;
  updateTask: (id: string, taskUpdate: Partial<Task>) => void;
  addTask: () => void;
  handleSearch: (value: string) => void;
  filteredTasks: Task[];
}

const useTaskManager = (): TaskManager => {
  const [title, setTitle] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const completeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, taskUpdate: Partial<Task>) => {
    const newTasks = tasks.slice();

    const index = tasks.findIndex((task) => task.id === id);

    newTasks[index] = { ...newTasks[index], ...taskUpdate };

    setTasks(newTasks);
  };

  const addTask = () => {
    if (title.length < 1) {
      return;
    }

    const newTask: Task = {
      id: nanoid(),
      title,
    };
    setTasks((prev) => [...prev, newTask]);
    setTitle("");
  };

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return {
    title,
    searchKeyword,
    tasks,
    completeTask,
    updateTask,
    addTask,
    handleSearch,
    filteredTasks,
  };
};

export default useTaskManager;
