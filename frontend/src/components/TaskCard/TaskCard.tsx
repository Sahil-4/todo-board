import { useDraggable } from "@dnd-kit/core";
import "./TaskCard.css";

type Props = {
  task: TaskI;
};

const TaskCard = (props: Props) => {
  const { task } = props;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style} className="task-card">
      <h4 className="task-title">{task.title}</h4>
      <p className="task-meta">
        {task.assignedTo?.username ?? "Unassigned"} &bull; {task.priority}
      </p>
      <p className="task-date">{new Date(task.updatedAt).toLocaleString()}</p>
      <p className="task-desc">{task.description}</p>
    </div>
  );
};

export default TaskCard;
