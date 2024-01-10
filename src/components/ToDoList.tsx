// import { Box } from "@mui/material";
import { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { TaskList } from "./TaskList";
import { Box, Button, Stack, TextField, useTheme } from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";

export const ToDoList = () => {
  const theme = useTheme();

  const initialTasks = [
    { id: "task-1", content: "Task 1" },
    { id: "task-2", content: "Task 2" },
  ];

  const [tasks, setTasks] = useLocalStorage("to-do-list", initialTasks);

  const resetTasks = () => {
    setTasks(initialTasks);
  };

  const [item, setItem] = useState("");
  const trimmed = item.trim();

  const handleAdd = () => {
    if (trimmed === "") return;
    setTasks([...tasks, { id: `task-${tasks.length + 1}`, content: trimmed }]);
    setItem("");
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

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
    <Box>
      <Stack
        alignItems={"center"}
        flexBasis={"content"}
        direction={"row"}
        sx={{ marginBottom: theme.spacing(4) }}
      >
        <TextField
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAdd();
            }
          }}
          value={item}
          label="Item to add"
          variant="standard"
          onChange={(v) => {
            setItem(v.target.value);
          }}
        />
        <Button
          disabled={trimmed === ""}
          onClick={handleAdd}
          color="primary"
          variant="contained"
          sx={{ marginRight: theme.spacing(4) }}
        >
          Add
        </Button>
        <Button onClick={resetTasks} color="warning" variant="outlined">
          Reset to initial state
        </Button>
      </Stack>
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskList tasks={tasks} removeTask={removeTask} />
      </DragDropContext>
    </Box>
  );
};
