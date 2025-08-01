import { useAppContext } from "../../context/useAppContext";
import "./ViewTaskModal.css";

const ViewTaskModal = () => {
  const { showViewTaskModel, closeViewTaskModel, selectedTask, openUpdateTaskModel } =
    useAppContext();

  const handleTaskClick = () => {
    closeViewTaskModel();
    openUpdateTaskModel(selectedTask!);
  };

  if (!showViewTaskModel || !selectedTask) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{selectedTask.title}</h2>
          <button className="close-btn" onClick={closeViewTaskModel}>
            ×
          </button>
        </div>

        <div className="task-meta">
          <span className="meta-badge">👤 {selectedTask.assignedTo?.username ?? "Unassigned"}</span>
          <span className={`meta-badge priority ${selectedTask.priority.toLowerCase()}`}>
            🚩 {selectedTask.priority}
          </span>
          <span className="meta-date">📅 {new Date(selectedTask.updatedAt).toLocaleString()}</span>
        </div>

        <div className="task-description">
          <h4>Description</h4>
          <div onClick={handleTaskClick}>
            {selectedTask.description.split("\n").map((segment) => (
              <div>{segment}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTaskModal;
