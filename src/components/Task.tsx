import { Draggable } from "@hello-pangea/dnd";
import { Button, Stack, useTheme } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";

export interface TaskType {
  id: string;
  content: string;
}

export const Task = ({
  task,
  index,
  removeTask,
}: {
  task: TaskType;
  index: number;
  removeTask: (id: string) => void;
}) => {
  const theme = useTheme();
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Stack
          alignItems={"center"}
          flexBasis={"content"}
          direction={"row"}
          sx={{ ":hover": { cursor: "grab" } }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <DragHandleIcon sx={{ marginRight: theme.spacing(1) }} />
          {task.content}
          <Button
            color="secondary"
            size="small"
            onClick={() => removeTask(task.id)}
            sx={{ marginLeft: theme.spacing(1) }}
          >
            Remove
          </Button>
        </Stack>
      )}
    </Draggable>
  );
};
