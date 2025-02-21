import React from "react";
import Task from "./Task";
import  { useState } from "react";

const TodoList = ({ tasks, addTask, removeTask, completeTask, isCompleted }) => {
  const [newTaskText, setNewTaskText] = useState("");

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      addTask(newTaskText);
      setNewTaskText("");
    }
  };

  return (
    <div>
      {!isCompleted && (
        <div>
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task"
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      )}
      <ul>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            removeTask={removeTask}
            completeTask={completeTask}
            isCompleted={isCompleted}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;