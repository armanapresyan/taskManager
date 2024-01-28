import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../app/feature/todoSlice";
import Modal from "../components/Modal";
import { uid } from 'uid';

import { useSelector } from "react-redux";
import { useProjectUsers } from "../hooks/useProjectUsers";
import { useEmail } from "../hooks/useEmail";

const AddAndSend = ({ isOpen, onClose, children }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const [isOpenSend, setIsOpenSend] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [email, setEmail] = useState("");
  

  const user = useSelector((state) => state.auth.user);
  const users = useProjectUsers();

  const sendEmail = useEmail(email || selectedEmail, title, user.firstName);

  const onEmailSelect = (evt) => {
    setSelectedEmail(evt.target.value)
    setEmail('')
  }

  console.log(selectedEmail);

  const onCreate = () => {
    console.log("asdd");
    dispatch(addTodo({
      title,
      description,
      id: uid(),
      author: user.email,
      assignee: email || selectedEmail,
      status: 'todo'
    }));
    

    sendEmail();
  };

  

  

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className={isOpenSend ? "hidden" : "flex"}
      >
        <div className="space-y-4">
          <TextField
            variant="standard"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
            fullWidth
          />
          <TextField
            variant="standard"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            label="Description"
            fullWidth
          />
        </div>
        <span className="block mt-8 mb-4">Assignee</span>
        <div className="flex items-center">
          <div className="flex-1">
            <span className="text-sm block mb-4 text-gray-500">
              Select user email:
            </span>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">User email</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="User email"
                value={selectedEmail}
                onChange={onEmailSelect}
              >
                {users.map((u) => (
                  <MenuItem  key={u.id} value={u.email}>{u.email}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <span className="mx-4 block mt-8 text-sm text-gray-500">Or</span>
          <div className="flex-1">
            <span className="text-sm block mb-4 text-gray-500">
              Enter email:
            </span>
            <TextField
              variant="outlined"
              placeholder="Assignee email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              fullWidth
            />
          </div>
        </div>

        <div className="flex justify-end pt-[30px]">
          <Button
            variant="contained"
            onClick={() => {
              onCreate();
              onClose();
            }}
          >
            Add Task
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AddAndSend;
