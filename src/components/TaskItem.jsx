import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editTodoStatus } from "../app/feature/todoSlice";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

function TaskItem({ todo, user }) {
  const [expandedText, setExpandedText] = useState(null);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();

  const onHandleExpand = (id) => {
    setExpandedText((prevExpanded) => (prevExpanded === id ? null : id));
  };

  const truncateText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    }
    return text.substring(0, limit) + "...";
  };

  useEffect(() => {
    if (todo.status === status || status === "") {
      return;
    }
    dispatch(editTodoStatus({ userEmail: user.email, status, id: todo.id }));
  }, [status, todo, dispatch, user]);

  return (
    <div className="flex gap-[12px] flex-wrap w-[100%]">
      <div
        className="xl:flex xl:flex-col xl:w-[95%] xl:h-[200px] 
            lg:flex lg:flex-col lg:w-[100%] lg:h-[200px] 
            md:flex md:flex-col md:w-[100%] md:h-[200px] 
            sm:flex sm:flex-col sm:w-[100%] sm:h-[200px] 
            flex flex-col  h-[200px] 
            bg-gray-200 mt-[25px] font-medium text-base leading-7 tracking-tight bg-grey p-8 rounded-xl shadow-md w-[100%]"
      >
        <div className="flex w-[90%] justify-between">
          <p>{todo.title}</p>
        </div>
        <div
          className="whitespace-wrap overflow-hidden overflow-ellipsis"
          onClick={() => onHandleExpand(todo.id)}
        >
          <p className="overflow-auto max-h-[200px]">
            {expandedText === todo.id
              ? todo.description
              : truncateText(todo.description, 30)}
          </p>
        </div>
        <div className="flex items-end justify-end h-[50%]">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Change Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="User email"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="InProgress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
