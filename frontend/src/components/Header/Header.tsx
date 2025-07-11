import { useAppContext } from "../../context/useAppContext";
import "./Header.css";

const Header = () => {
  const { user, logout, openAddTaskModel, openLogsModel } = useAppContext();

  return (
    <div className="header">
      <span>To-Do Board</span>

      <div className="header-links">
        <ul>
          <li>
            <span>{user?.username}</span>
          </li>
          <li>
            <button onClick={openAddTaskModel}>Add task</button>
          </li>
          <li>
            <button onClick={openLogsModel}>Show logs</button>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
