import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import { createContext, useEffect, useState } from "react";
export const TaskContext = createContext(null);
export default function TodoList() {
  const [todo, setTodo] = useState("");
  const [tasks, setTasks] = useState([]);
  const [type , setType] = useState("all")
const completed = (id) => {
  const updatedTasks = tasks.map((tas) => 
    tas.id === id ? { ...tas, isCompleted: !tas.isCompleted } : tas
  );

  setTasks(updatedTasks);
  localStorage.setItem("todo", JSON.stringify(updatedTasks));
};

  function handelSubmit(e) {
    if (!todo) {
      e.preventDefault();
      return alert("You Must Add a Task");
    }
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      name: todo,
      desc: "",
      isCompleted: false,
    };
    const newItem = [...tasks, newTask]
    setTasks(newItem);
    localStorage.setItem("todo" , JSON.stringify(newItem))
    setTodo("");
  }
useEffect(() => {
  const saved = localStorage.getItem("todo") || [];
  if (saved) {
    setTasks(JSON.parse(saved));
  }
}, []);


// Filter ==>
  const completedTasks = tasks.filter((t)=>{
    return t.isCompleted;
  })
  const notCompletedTasks = tasks.filter((t)=>{
    return !t.isCompleted;
  })
  const allTasks = tasks
  
  function changeType(e){
    setType(e.target.value)
  }
  let renderTasks = tasks;

  if(type === "completed"){
    renderTasks = completedTasks;
  }else if(type === "pending"){
    renderTasks = notCompletedTasks;
  }else{
    renderTasks = tasks
  }

  return (
    <>
      <TaskContext.Provider value={[tasks, setTasks]}>
        <div className="title">
          <h1>TODO | List</h1>
          <img src="/4345800.png" alt="" />
        </div>

        <form onSubmit={handelSubmit}>
          <input
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            type="text"
            placeholder="Enter a task..."
          />
          <button>Add</button>
        </form>

        <div className="btns">
          <ToggleButtonGroup onChange={changeType} value={type} color="primary" exclusive aria-label="Platform">
            <ToggleButton
            className="lll"
              sx={{ border: "2px solid lightgreen", color: "black"  }}
              value="all"
            >
              All
            </ToggleButton>
            <ToggleButton 
            className="lll"
              sx={{ border: "2px solid lightgreen", color: "black" }}
              value="pending"
            >
              Pending
            </ToggleButton>
            <ToggleButton
            className="lll"
              sx={{ border: "2px solid lightgreen", color: "black" }}
              value="completed"
            >
              Completed
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div className="tasksHere">
          {renderTasks.map((task) => {
            return (
              <Todo
                tt={tasks}
                setTt={setTasks}
                completed={completed}
                key={task.id}
                name={task.name}
                id={task.id}
                isCompleted={task.isCompleted}
                desc={task.desc}
              />
            );
          })}
        </div>
      </TaskContext.Provider>
    </>
  );
}
