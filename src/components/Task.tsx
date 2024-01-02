import { Draggable } from "@hello-pangea/dnd";
import { Box } from "@mui/material";

export interface TaskType {
  id: string;
  content: string;
}

export const Task = ({ task, index }: { task: TaskType; index: number }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.content}
        </Box>
      )}
    </Draggable>
  );
};
