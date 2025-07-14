import { useEffect } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useAppContext } from "../../context/useAppContext";
import KanbanColumn from "../KanbanColumn/KanbanColumn";
import "./KanbanBoard.css";

const KanbanBoard = () => {
  const { fetchTasks, groupedTasks, updateTaskStatus } = useAppContext();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const status = over.id as TaskI["status"];

    updateTaskStatus(taskId, status);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="kanban-board">
      <DndContext onDragEnd={handleDragEnd}>
        {groupedTasks.map((column) => {
          return (
            <KanbanColumn
              key={column.key}
              label={column.label}
              status={column.key}
              tasks={column.tasks}
            />
          );
        })}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
