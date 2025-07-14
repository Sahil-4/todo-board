import { useEffect, useState } from "react";
import { useAppContext } from "../../context/useAppContext";
import "./UpdateTaskModal.css";

const UpdateTaskModal = () => {
  const { showUpdateTaskModel, closeUpdateTaskModel, selectedTask, updateTask } = useAppContext();

  const [task, setTask] = useState(selectedTask);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value } as TaskI);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task) return;
    updateTask(task._id, task);
    closeUpdateTaskModel();
  };

  useEffect(() => {
    setTask(selectedTask);
  }, [selectedTask]);

  if (!showUpdateTaskModel || !task) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{task.title}</h2>
          <button className="close-btn" onClick={closeUpdateTaskModel}>
            ×
          </button>
        </div>

        <div className="task-meta">
          <span className="meta-badge">👤 {task.assignedTo?.username ?? "Unassigned"}</span>
          <span className="meta-date">📅 {new Date(task.updatedAt).toLocaleString()}</span>
        </div>

        <form className="update-task-form" onSubmit={handleSubmit}>
          <label>
            <h4>Priority</h4>
            <select name="priority" value={task.priority} onChange={handleChange}>
              <option value="Low">🟢 Low</option>
              <option value="Medium">🟡 Medium</option>
              <option value="High">🔴 High</option>
            </select>
          </label>

          <label>
            <h4>Description</h4>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              rows={16}
              placeholder="Update task description"
            />
          </label>

          <button type="submit" className="submit-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
