import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import AddAndSend from "./AddAndSend";
import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, setFilteredTodos } from "../app/feature/todoSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Tasks() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const todos = useSelector((state) => state.todo.todos);

  const user = useSelector((state) => state.auth.user);

  const [tasks, setTasks] = useState(todos);

  useEffect(() => {
    dispatch(fetchTodos(user.email));
  }, [dispatch, user]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filteredTasks = todos.filter((task) => {
        return task.title.toLowerCase().includes(search.toLowerCase());
      });
      setTasks(filteredTasks);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [todos, search, user]);

  const buttonStyle = {
    backgroundColor: "#2FB89D",
    width: "60%",
    borderRadius: "25px",
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="xl:flex xl:flex-col xl:gap-12  xl:items-center xl:w-[80%]
    lg:flex lg:flex-col lg:gap-12  lg:items-center lg:w-[80%]
    md:flex md:flex-col md:gap-12  md:items-center md:w-[80%]
    sm:flex sm:flex-col sm:gap-12  sm:items-center sm:w-[80%]
    w-full flex flex-col items-center gap-[12px]
    bg-gray-100  h-[100%] font-medium text-base leading-7 tracking-tight bg-grey"
    >
      <div className="w-[95%] bg-white p-8 rounded-xl shadow-md mt-[20px] ">
        My Project
      </div>
      {isOpen && (
        <AddAndSend isOpen={isOpen} onClose={handleClose}>
          Add task
        </AddAndSend>
      )}
      <div className="bg-white p-8 rounded-xl shadow-md w-[95%] h-[80%] overflow-auto max-h-[80%]">
        <div
          className="xl:flex xl:justify-between xl:flex-row
          lg:flex lg:justify-between lg:flex-row
          md:flex md:justify-between md:flex-row
         sm:flex sm:flex-col sm:justify-around sm:items-center
         flex flex-col items-center 
        "
        >
          <h1>Task</h1>
          <div className="flex gap-7 xl:w-[50%]  lg:w-[50%] md:w-[50%] sm:w-[50%] w-[100%] justify-around">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                text={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Search>
            <Button
              variant="contained"
              style={buttonStyle}
              onClick={handleClose}
            >
              Add Task
            </Button>
          </div>
        </div>
        <div
          className="xl:flex xl:w-[100%] xl:justify-around xl:pt-[35px] xl:flex-row
           lg:flex lg:w-[100%] lg:justify-around lg:pt-[35px] lg:flex-row
           md:flex md:w-[100%] md:justify-around md:pt-[35px] md:flex-row
           sm:flex sm:flex-col gap-[30px]
           flex pt-[30px] flex-col
           "
        >
          <div className="flex items-center flex-col bg-gray-300  xl:w-[25%]  lg:w-[23%] md:w-[18%] sm:w-[100%] w-[100%] p-8 rounded-xl shadow-md min-h-[95px]">
            <p>To do</p>
            <div className="w-[100%]">
              {tasks
                .filter((item) => item.status === "todo")
                .map((item) => (
                  <TaskItem key={item.id} todo={item} user={user} />
                ))}
            </div>
          </div>
          <div className="flex items-center flex-col bg-gray-300  xl:w-[25%]  lg:w-[23%] md:w-[18%] sm:w-[100%] w-[100%] p-8 rounded-xl shadow-md min-h-[95px]">
            <p>In progress</p>
            <div className="w-[100%]">
              {tasks
                .filter((item) => item.status === "InProgress")
                .map((item) => (
                  <TaskItem key={item.id} todo={item} user={user} />
                ))}
            </div>
          </div>
          <div className="flex items-center flex-col bg-gray-300  xl:w-[25%]  lg:w-[23%] md:w-[18%] sm:w-[100%] w-[100%] p-8 rounded-xl shadow-md min-h-[95px]">
            <p>Done</p>
            <div className="w-[100%]">
              {tasks
                .filter((item) => item.status === "Done")
                .map((item) => (
                  <TaskItem key={item.id} todo={item} user={user} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
