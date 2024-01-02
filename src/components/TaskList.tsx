import { Droppable } from "@hello-pangea/dnd";
import { Task, TaskType } from "./Task";
import { Box } from "@mui/material";

export const TaskList = ({ tasks }: { tasks: TaskType[] }) => {
  return (
    <Droppable droppableId="tasks">
      {(provided) => (
        <Box
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};
