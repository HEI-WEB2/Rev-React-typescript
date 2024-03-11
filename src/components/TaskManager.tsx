import { nanoid } from "nanoid";
import { useState, useCallback } from "react";

interface Task {
  id: string;
  title: string;
}

interface TaskManagerProps {
  tasks: Task[];
  onAddTask: (title: string) => void;
  onUpdateTask: (id: string, taskUpdate: Partial<Task>) => void;
  onCompleteTask: (id: string) => void;
  onSearch: (keyword: string) => void;
}

const useTaskManager = (): TaskManagerProps => {
  const [title, setTitle] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const completeTask = useCallback((id: string): void => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const updateTask = useCallback(
    (id: string, taskUpdate: Partial<Task>): void => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, ...taskUpdate } : task
        )
      );
    },
    []
  );

  const addTask = useCallback((): void => {
    if (title.length < 1) {
      return;
    }

    const newTask: Task = {
      id: nanoid(),
      title,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTitle("");
  }, [title]);

  const handleSearch = useCallback((keyword: string): void => {
    setSearchKeyword(keyword);
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return {
    tasks: filteredTasks,
    onAddTask: addTask,
    onUpdateTask: updateTask,
    onCompleteTask: completeTask,
    onSearch: handleSearch,
  };
};

export default useTaskManager;
