// src/views/TasksTable.tsx
import React, { useState } from "react";
import ITask from "../interfaces/ITask";

type Props = {
  taskRow: ITask;
  deleteTaskInComponentTasks: (id: string) => void;
  updateTaskCheckbox: (taskRow: ITask) => void;
  updateTaskRow: (isModified: boolean, taskRow: ITask) => void;
};

const TasksRow: React.FC<Props> = (props: Props) => {
  const [taskRow, settaskRow] = useState(props.taskRow);

  const updateTaskCheckbox = async (value: boolean) => {
    const updateTaskRow = { ...taskRow, done: value };
    settaskRow(updateTaskRow);

    // taskRow.done = value;
    props.updateTaskCheckbox(updateTaskRow);
  };

  const deleteTaskInComponent = async () => {
    props.deleteTaskInComponentTasks(taskRow._id!);
  };

  const updateTaskRow = async (value: string) => {
    //aeguments
    //isModified:boolean
    //task:Itask
    props.updateTaskRow(true, taskRow);
  };

  return (
    <div className="task-row-container">
      <table className="task-row">
        <thead>
          <tr>
            <th>Priorité</th>
            <th>Done</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Date</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{taskRow.priority}</td>
            <td>
              <input
                type="checkbox"
                name="done"
                checked={taskRow.done}
                onChange={(event) => updateTaskCheckbox(event.target.checked)}
              />
            </td>
            <td>{taskRow.title}</td>
            <td>{taskRow.description}</td>
            <td>{taskRow.date}</td>
            <td>
              <button
                className="btn-blue"
                onClick={() => updateTaskRow("updateRow")}
              >
                modifier
              </button>
            </td>
            <td>
              <button
                className="btn-red"
                onClick={() => deleteTaskInComponent()}
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TasksRow;
