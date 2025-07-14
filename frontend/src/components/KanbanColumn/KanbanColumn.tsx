import { useDroppable } from "@dnd-kit/core";
import TaskCard from "../TaskCard/TaskCard";
import "./KanbanColumn.css";

type Props = {
  label: string;
  tasks: TaskI[];
  status: TaskI["status"];
};

const KanbanColumn = (props: Props) => {
  const { label, tasks, status } = props;

  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div className="kanban-column" ref={setNodeRef}>
      <h3 className="column-label">{label}</h3>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
