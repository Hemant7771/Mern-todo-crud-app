import React, { useState } from "react";

function TaskItem({ task, onDelete, onUpdate }) {

  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  return (
    <li>

      {isEditing ? (
        <>
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />

          <div className="taskBtns">

            <button
              className="saveBtn"
              onClick={() => {
                onUpdate(task._id, newText);
                setIsEditing(false);
              }}
            >
              Save
            </button>

          </div>
        </>
      ) : (
        <>
          <span>{task.text}</span>

          <div className="taskBtns">

            <button
              className="editBtn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button
              className="deleteBtn"
              onClick={() => onDelete(task._id)}
            >
              Delete
            </button>

          </div>
        </>
      )}

    </li>
  );
}

export default TaskItem;