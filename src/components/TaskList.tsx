import { Droppable } from "@hello-pangea/dnd";
import { Task, TaskType } from "./Task";
import { Box } from "@mui/material";

interface Props {
  tasks: TaskType[];
  removeTask: (id: string) => void;
}

export const TaskList = ({ tasks, removeTask }: Props) => {
  return (
    <Droppable droppableId="tasks">
      {(provided) => (
        <Box {...provided.droppableProps} ref={provided.innerRef}>
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} removeTask={removeTask} />
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};
