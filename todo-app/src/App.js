import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import Confetti from "react-confetti";
import "./styles.css";

function App() {
  const [pendingTasks, setPendingTasks] = useState([]); // Tasks that are not completed
  const [completedTasks, setCompletedTasks] = useState([]); // Tasks that are completed
  const [lastAction, setLastAction] = useState(null); // State to track the last action (remove/complete)
  const [showConfetti, setShowConfetti] = useState(false); // State to control confetti

  // Function to add a new task
  const addTask = (taskText) => {
    const newTask = { id: Date.now(), text: taskText, completed: false };
    setPendingTasks([...pendingTasks, newTask]);
  };

  // Function to remove a task
  const removeTask = (taskId, isCompleted) => {
    let taskToRemove;
    if (isCompleted) {
      taskToRemove = completedTasks.find((task) => task.id === taskId);
      setCompletedTasks(completedTasks.filter((task) => task.id !== taskId));
    } else {
      taskToRemove = pendingTasks.find((task) => task.id === taskId);
      setPendingTasks(pendingTasks.filter((task) => task.id !== taskId));
    }
    setLastAction({ type: "remove", task: taskToRemove, isCompleted });
    setTimeout(() => setLastAction(null), 5000); // Clear undo option after 5 seconds
  };

  // Function to mark a task as completed
  const completeTask = (taskId) => {
    const taskToComplete = pendingTasks.find((task) => task.id === taskId);
    setPendingTasks(pendingTasks.filter((task) => task.id !== taskId));
    setCompletedTasks([...completedTasks, { ...taskToComplete, completed: true }]);
    setLastAction({ type: "complete", task: taskToComplete });
    setTimeout(() => setLastAction(null), 5000); // Clear undo option after 5 seconds

    // Show confetti
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
  };

  // Function to undo the last action
  const undoLastAction = () => {
    if (lastAction) {
      if (lastAction.type === "remove") {
        if (lastAction.isCompleted) {
          setCompletedTasks([...completedTasks, lastAction.task]); // Re-add to completed tasks
        } else {
          setPendingTasks([...pendingTasks, lastAction.task]); // Re-add to pending tasks
        }
      } else if (lastAction.type === "complete") {
        setPendingTasks([...pendingTasks, lastAction.task]); // Move back to pending tasks
        setCompletedTasks(completedTasks.filter((task) => task.id !== lastAction.task.id));
      }
      setLastAction(null); // Clear the undo option
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      {showConfetti && <Confetti />} {/* Show confetti when `showConfetti` is true */}
      <div className="columns">
        <div className="column">
          <h2>Add a Task</h2>
          <TodoList
            tasks={pendingTasks}
            addTask={addTask}
            removeTask={(taskId) => removeTask(taskId, false)}
            completeTask={completeTask}
            isCompleted={false}
          />
        </div>
        <div className="column">
          <h2>Completed Tasks</h2>
          <TodoList
            tasks={completedTasks}
            removeTask={(taskId) => removeTask(taskId, true)}
            isCompleted={true}
          />
        </div>
      </div>
      {lastAction && (
        <div className="undo-notification">
          <p>Task {lastAction.type === "remove" ? "removed" : "completed"}.</p>
          <button onClick={undoLastAction}>Undo</button>
        </div>
      )}
    </div>
  );
}

export default App;
