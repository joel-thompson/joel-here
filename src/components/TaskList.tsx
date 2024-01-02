import { Droppable } from "@hello-pangea/dnd";
import { Task, TaskType } from "./Task";

export const TaskList = ({ tasks }: { tasks: TaskType[] }) => {
  return (
    <Droppable droppableId="tasks">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
