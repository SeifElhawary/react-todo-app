import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState , useContext } from "react";
import { TaskContext } from "./todoList";
import Alert from '@mui/material/Alert';
function Todo({ id, name, desc, isCompleted, completed }) {
  const [dialog, setDialog] = useState(false);
  const [editDialog, showEditDialog] = useState(false);
  const [updateTodo, setUpdate] = useState({ title: name, details: desc });
  const [tasks, setTasks] = useContext(TaskContext);
  const deleteTask = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };

  const handleConfirmDelete = () => {
    const updatedList = tasks.filter((item) => item.id !== id);
    setTasks(updatedList);
    setDialog(false);
     localStorage.setItem("todo" , JSON.stringify(updatedList))
  };

  function closeEdit() {
    showEditDialog(false);
  }
  function openEdit() {
    showEditDialog(true);
  }
  function confirmEdit() {
    const editedItem = tasks.map((item) => {
      if (item.id === id) {
        return { ...item, name: updateTodo.title, desc: updateTodo.details };
      } else {
        return item;
      }
    });
    setTasks(editedItem);
     localStorage.setItem("todo" , JSON.stringify(editedItem))
    showEditDialog(false);
  }

  return (
    <>
      {/* Dialog start */}
      <Dialog open={dialog} onClose={handleClose}>
        <DialogTitle id="responsive-dialog-title">Just Checking...</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{name}"? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Go Back</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            autoFocus
          >
            Remove Task
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editDialog} onClose={closeEdit}>
        <DialogTitle>Edit Task "{name}"</DialogTitle>
        <DialogContent>
          <DialogContentText>Update your task details below.</DialogContentText>
          <form onSubmit={(e) => e.preventDefault()} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Task name"
              type="text"
              fullWidth
              variant="standard"
              value={updateTodo.title}
              onChange={(e) =>
                setUpdate({ ...updateTodo, title: e.target.value })
              }
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="details"
              label="Task details"
              type="text"
              fullWidth
              variant="standard"
              value={updateTodo.details}
              onChange={(e) =>
                setUpdate({ ...updateTodo, details: e.target.value })
              }
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEdit}>Cancel</Button>
          <Button onClick={confirmEdit} type="submit" form="subscription-form">
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog ends */}
      

      <div className="task">
        <div className="info">
          <h2
            style={{
              textDecoration: isCompleted ? "line-through" : "none",
              color: isCompleted ? "lightgreen" : "white",
            }}
          >
            {name}
          </h2>
          <p
            style={{
              color: "lightgray",
              textDecoration: isCompleted ? "line-through" : "none",
            }}
          >
            {desc}
          </p>
          <span style={{
            border:isCompleted? "3px solid lightgreen" : "3px solid rgb(21, 185, 240)",
            boxShadow:isCompleted? "inset 1px 1px 5px lightgreen" : " inset 1px 1px 5px lightblue",
            color:isCompleted? "lightgreen" : "lightblue"
          }} className="status">{isCompleted? "Completed" : "Pending..."}</span>
        </div>
        <div className="buttons">
          <IconButton
            className="bbb"
            onClick={() => completed(id)}
            sx={{
              backgroundColor: isCompleted ? "lightgreen" : "white",
              color: isCompleted ? "white" : "green",
              border: "3px solid",
              borderColor: isCompleted ? "lightgreen" : "green",
            }}
            aria-label="check"
          >
            <CheckIcon />
          </IconButton>

          <IconButton
            onClick={openEdit}
            className="bbb"
            sx={{
              backgroundColor: "white",
              border: "3px solid blue",
              color: "blue",
            }}
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>

          <IconButton
            className="bbb"
            onClick={deleteTask}
            sx={{
              backgroundColor: "white",
              border: "3px solid red",
              color: "red",
            }}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default Todo;
