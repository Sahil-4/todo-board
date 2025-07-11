import { useEffect } from "react";
import { useAppContext } from "../../context/useAppContext";
import "./ActivityLogModal.css";

const ActivityLogModal = () => {
  const { showLogsModel, closeLogsModel, logs, fetchLogs } = useAppContext();

  useEffect(() => {
    if (showLogsModel) {
      fetchLogs();
    }
  }, [showLogsModel]);

  if (!showLogsModel) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Activity Log</h2>
          <button className="close-btn" onClick={closeLogsModel}>
            ×
          </button>
        </div>

        <div className="logs-container">
          {logs.length === 0 ? (
            <p className="log-placeholder">No recent activity</p>
          ) : (
            logs.map((log) => (
              <div key={log._id} className="log">
                <p className="log-task">Task: {log.task?.title ?? "-"}</p>
                <p className="log-action">
                  {log.action} by{" "}
                  <span className="log-user">{log.user?.username ?? "Unknown User"}</span>
                </p>
                <p className="log-time">{new Date(log.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLogModal;
