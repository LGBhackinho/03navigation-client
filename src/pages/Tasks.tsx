// src/views/Tasks.tsx
import React, { useEffect, useState, useCallback } from "react";
import TasksRow from "../component/TasksRow";
import {
  addTask,
  deleteTask,
  fetchTasks,
  updateTaskDone,
  editTask,
} from "../services/fetchTasks";
import ITask from "../interfaces/ITask";
import TasksFormObject from "../component/TasksFormObject";

const Tasks: React.FC = () => {
  const [listTasks, setlistTasks] = useState<ITask[]>([]); // État pour stocker la tâche ajoutée
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  ////POUR LE BOUTON MODIFICATION
  const [isModified, setIsModified] = useState(false);
  const [taskToPass, setTaskToPass] = useState<ITask>({ title: "", date: "" });

  useEffect(() => {
    getAllTasks();
  }, []);

  //pour récupérer la liste
  const getAllTasks = useCallback(async () => {
    setlistTasks([]);
    let list = await fetchTasks();
    setlistTasks([...list]);
  }, []);

  const addTaskInComponentTasks = async (
    taskToAdd: ITask,
    isModifiedValue: boolean
  ) => {
    if (isModifiedValue) {
      //modifier une tâche
      let task = await editTask(taskToAdd);
      console.log(task);
      setIsModified(false);
    } else {
      //ajouter une tâche
      let task = await addTask(taskToAdd);
      console.log(task);
      setIsModified(false);
    }
    //afficher la liste
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

  const updateTaskRow = (isModified: boolean, taskRow: ITask) => {
    setIsModified(isModified);
    setTaskToPass(taskRow);
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
        task={taskToPass}
        isModified={isModified}
        addTaskInComponentTask={(taskToAdd: ITask, isModified: boolean) =>
          addTaskInComponentTasks(taskToAdd, isModified)
        }
      />
      {showDeleteModal && (
        <div className="container-valid-delete">
          <p>Etes-vous sur de vouloir supprimer {taskToPass.title} ?</p>
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
            updateTaskCheckbox={(taskRow: ITask) => updateTaskCheckbox(taskRow)}
            updateTaskRow={(isModified: boolean, taskRow: ITask) =>
              updateTaskRow(isModified, taskRow)
            }
          />
        </div>
      ))}
    </div>
  );
};

export default Tasks;
