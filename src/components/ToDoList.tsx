// import { Box } from "@mui/material";
import { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { TaskList } from "./TaskList";

export const ToDoList = () => {
  const [tasks, setTasks] = useState([
    { id: "task-1", content: "Task 1" },
    { id: "task-2", content: "Task 2" },
    // Add more tasks here
  ]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newTasks = Array.from(tasks);
    const [removed] = newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, removed);

    setTasks(newTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <TaskList tasks={tasks} />
    </DragDropContext>
  );
};
