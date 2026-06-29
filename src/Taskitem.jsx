function Taskitem({Taskname, deleteTask, completeTask, isCompleted,})
{
  return (
    <li className="task d-flex justify-content-between align-items-center mb-2">
      <span>{Taskname}</span>

      <div className="taskbtn d-flex gap-2">
        {!isCompleted && (
          <button className="btn btn-sm btn-success"onClick={() => completeTask(Taskname)} > Complete </button>
        )}

        <button className="btn btn-sm btn-danger"  onClick={() => deleteTask(Taskname)} > Delete </button>
      </div>
    </li>
  );
}

export default Taskitem;