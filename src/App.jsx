import { useState } from "react";
import "./App.css";
import Taskitem from "./Taskitem";
import { LocalNotifications } from "@capacitor/local-notifications";

function App() {
  const [newTask, setNewTask] = useState("");

  const [myTasks, setMyTasks] = useState([]);

  const [completedTasks, setCompletedTasks] = useState([]);

  const [reminderTime, setReminderTime] = useState("");

 


  function startListening() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.onresult = (event) => {
    setNewTask(event.results[0][0].transcript);
  };

  recognition.start();
}



async function showNotification(task, time) {
  const targetTime = new Date(time).getTime();

  if (targetTime > Date.now()) {
    await LocalNotifications.schedule({
      notifications: [
        {
          id:  Math.floor(Math.random() * 1000),
          title: "Task Reminder",
          body: task,
          schedule: { at: new Date(time) },
        },
      ],
    });
  } else {
    await LocalNotifications.schedule({
      notifications: [
        {
          id:  Math.floor(Math.random() * 1000),
          title: "Task Added",
          body: task,
        },
      ],
    });
  }
}

function addTask() {
  if (newTask.trim() === "") return;

  setMyTasks((prev) => [...prev, newTask]);

  if (reminderTime) {
    showNotification(newTask, reminderTime);
  }

  setNewTask("");
  setReminderTime("");
}

  function completeTask(taskName) {
    setMyTasks((prev) => prev.filter((task) => task !== taskName));

    setCompletedTasks((prev) => [...prev, taskName]);
  }

  function deleteTask(taskName) {
    setMyTasks((prev) => prev.filter((task) => task !== taskName));

    setCompletedTasks((prev) => prev.filter((task) => task !== taskName)
    );
  }

  return (
    <div className="main-body d-flex justify-content-center align-items-center">
      <div className="main">
        <h2>MY TO DO LIST</h2>

        <div  className="inputdiv">
          <div className="form-floating w-75">
            <input type="text" className="form-control" placeholder="Enter task" value={newTask} onChange={(e) => setNewTask(e.target.value)}  />
            <input type="datetime-local" className="form-control mt-2 w-50" value={reminderTime}
                      onChange={(e) => setReminderTime(e.target.value)}/>

               <label >Enter Task</label>
          </div>
                <button className="btn btn-danger" id="btn"  onClick={addTask}>+ </button>
                 <button className="btn btn-primary" onClick={startListening} > 🎤  </button>

        </div>

         
          
       

        <h5 className="mt-4"> <b>  To Be Completed</b> </h5>

        <ul className="tasklist">
          {myTasks.length === 0 ? (
            <p>No pending tasks</p>
          ) : (
            myTasks.map((task, index) => (
              <Taskitem
                key={index} Taskname={task} deleteTask={deleteTask}  completeTask={completeTask}  isCompleted={false} />
            ))
          )}
        </ul><hr />

        <h5><b> Completed Tasks</b></h5>

        <ul className="tasklist">
           {completedTasks.length === 0 ? (
             <p>No completed tasks</p>
          ) : (
            completedTasks.map((task, index) => (
              <Taskitem
                key={index}  Taskname={task} deleteTask={deleteTask} isCompleted={true} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;