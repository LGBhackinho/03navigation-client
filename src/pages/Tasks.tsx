// src/views/Tasks.tsx
import React, { useEffect, useState } from "react";
import TasksRow from "../component/TasksRow";
import {
  addTask,
  deleteTask,
  fetchTasks,
  updateTaskDone,
} from "../services/fetchTasks";
import ITask from "../interfaces/ITask";
import TasksFormObject from "../component/TasksFormObject";

const Tasks: React.FC = () => {
  const [listTasks, setlistTasks] = useState<ITask[]>([]); // État pour stocker la tâche ajoutée
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  useEffect(() => {
    getAllTasks();
  }, []);

  //pour récupérer la liste
  const getAllTasks = async () => {
    let list = await fetchTasks();
    setlistTasks(list);
  };

  const addTaskInComponentTask = async (taskToAdd: ITask) => {
    let task = await addTask(taskToAdd);
    console.log(task);
    await getAllTasks();
  };

  const confirmDeleteTask = (id: string) => {
    setTaskToDelete(id);
    setShowDeleteModal(true);
  };

  const updateTaskCheckbox = async (taskRow: ITask) => {
    await updateTaskDone(taskRow);

    await getAllTasks();
  };

  const updateTaskRow = async (taskRow: ITask) => {
    await updateTaskRow(taskRow);

    await getAllTasks();
  };

  const handleDeleteConfirmation = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete);

      await getAllTasks();
      setShowDeleteModal(false);
      setTaskToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  return (
    <div className="right-side">
      <TasksFormObject
        addTaskInComponentTask={(taskToAdd: ITask) =>
          addTaskInComponentTask(taskToAdd)
        }
      />
      {showDeleteModal && (
        <div className="container-valid-delete">
          <p>Etes-vous sur de vouloir supprimer ?</p>
          <div className="container-btn-delete">
            <button className="btn-gray" onClick={handleCancelDelete}>
              Annuler
            </button>
            <button className="btn-blue" onClick={handleDeleteConfirmation}>
              Valider
            </button>
          </div>
        </div>
      )}
      {listTasks.map((task: ITask) => (
        <div key={task._id}>
          <TasksRow
            taskRow={task}
            deleteTaskInComponentTasks={(id: string) => confirmDeleteTask(id)}
            updateTaskCheckbox={(taskRow) => updateTaskCheckbox(taskRow)}
            updateTaskRow={(taskRow) => updateTaskRow(taskRow)}
          />
        </div>
      ))}
    </div>
  );
};

export default Tasks;
