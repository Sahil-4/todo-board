import { useEffect, useState } from "react";
import { useAppContext } from "../../context/useAppContext";
import "./ConflictResolutionModal.css";

const ConflictResolutionModal = () => {
  const { showConflictResolutionModal, closeConflictResolutionModal, conflictedTask, updateTask } =
    useAppContext();
  const { taskClient, taskServer } = conflictedTask;

  const [task, setTask] = useState<TaskI>({} as TaskI);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Submit resolved version to backend (implement as needed)
    updateTask(task._id, task);

    // Close the modal after saving
    closeConflictResolutionModal();
  };

  useEffect(() => {
    setTask({ ...taskServer } as TaskI);
  }, [taskServer]);

  if (!showConflictResolutionModal || !taskClient || !task) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Resolve Conflict</h2>
          <button className="close-btn" onClick={closeConflictResolutionModal}>
            ×
          </button>
        </div>

        <div className="conflict-columns">
          {/* Client View - Readonly */}
          <div className="conflict-column">
            <h3>⏳ Your Version</h3>
            <div className="task-meta">
              <span className="meta-badge">
                👤 {taskClient.assignedTo?.username ?? "Unassigned"}
              </span>
              <span className={`meta-badge priority ${taskClient.priority.toLowerCase()}`}>
                🚩 {taskClient.priority}
              </span>
              <span className="meta-date">
                📅 {new Date(taskClient.updatedAt).toLocaleString()}
              </span>
            </div>
            <div className="task-description">
              <h4>Description</h4>
              <p>
                {task.description.split("\n").map((segment) => (
                  <div>{segment}</div>
                ))}
              </p>
            </div>
          </div>

          {/* Server View - Editable */}
          <div className="conflict-column">
            <h3>🛰️ Server Version</h3>
            <form className="update-task-form" onSubmit={handleSubmit}>
              <label>
                <h4>Priority</h4>
                <select name="priority" value={task.priority} onChange={handleOnChange}>
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
                  onChange={handleOnChange}
                  rows={8}
                  placeholder="Update task description"
                />
              </label>

              <button type="submit" className="submit-btn">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConflictResolutionModal;
