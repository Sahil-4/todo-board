import { useDraggable } from "@dnd-kit/core";
import { useAppContext } from "../../context/useAppContext";
import "./TaskCard.css";

type Props = {
  task: TaskI;
};

const TaskCard = ({ task }: Props) => {
  const { openViewTaskModel } = useAppContext();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const handleTaskClick = () => {
    openViewTaskModel(task);
  };

  return (
    <div ref={setNodeRef} style={style} className="task-card">
      <div className="task-header">
        <h4 className="task-title" onClick={handleTaskClick}>
          {task.title}
        </h4>
        <div className="drag-handle" {...listeners} {...attributes}>
          &#x283F;
        </div>
      </div>
      <p className="task-meta">
        {task.assignedTo?.username ?? "Unassigned"} &bull; {task.priority}
      </p>
      <p className="task-date">{new Date(task.updatedAt).toLocaleString()}</p>
      <p className="task-desc" onClick={handleTaskClick}>
        {task.description}
      </p>
    </div>
  );
};

export default TaskCard;
