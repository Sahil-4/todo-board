import { useAppContext } from "../../context/useAppContext";
import "./ErrorModal.css";

const ErrorModal = () => {
  const { error, closeErrorModal } = useAppContext(); // Assume error is a string

  if (!error) return null;

  return (
    <div className="modal-overlay">
      <div className="modal error-modal">
        <div className="modal-header">
          <h2>Error</h2>
          <button className="close-btn" onClick={closeErrorModal}>
            ×
          </button>
        </div>
        <div className="error-content">
          <p className="error-message">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
