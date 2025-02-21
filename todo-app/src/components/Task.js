import React from "react";

const Task = ({ task, removeTask, completeTask, isCompleted }) => {
  return (
    <li>
      {!isCompleted && (
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => completeTask(task.id)}
        />
      )}
      <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.text}
      </span>
      <button onClick={() => removeTask(task.id, isCompleted)}>Remove</button>
    </li>
  );
};

export default Task;