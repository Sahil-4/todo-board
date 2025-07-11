import { useState } from "react";
import { useAppContext } from "../../context/useAppContext";
import "./AddTaskModal.css";

const newTaskInititalValue: TaskNew = {
  title: "",
  description: "",
  priority: "Low",
};

const AddTaskModal = () => {
  const { showAddTaskModel, closeAddTaskModel, addTask } = useAppContext();
  const [task, setTask] = useState<TaskNew>(newTaskInititalValue);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(task);
    setTask(newTaskInititalValue);
    closeAddTaskModel();
  };

  if (!showAddTaskModel) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Task</h2>
          <button className="close-btn" onClick={closeAddTaskModel}>
            ×
          </button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={task.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Task Description"
            value={task.description}
            onChange={handleChange}
            required
          />
          <select name="priority" value={task.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button type="submit" className="submit-btn">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
