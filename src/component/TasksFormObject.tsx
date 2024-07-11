// src/views/Tasks.tsx
import React, { useState, useEffect } from "react";
import ITask from "../interfaces/ITask";

type Props = {
  task: ITask;
  isModified: boolean;
  addTaskInComponentTask: (taskRow: ITask, isModified: boolean) => void;
};

const TasksFormObject: React.FC<Props> = (props: Props) => {
  const [descriptionVisibility, setdescriptionVisibility] = useState(
    "descriptionErrorHidden"
  );
  const [titleVisibility, settitleVisibility] = useState("titleErrorHidden");
  const [dateVisibility, setdateVisibility] = useState("dateErrorHidden");

  const [taskForm, setTaskForm] = useState<ITask>({
    title: "",
    date: "",
    priority: "",
  });

  const [showButtonCreateOrModify, setShowButtonCreateOrModify] = useState("");

  useEffect(() => {
    //state pour les champs
    if (!props.isModified) {
      setTaskForm({
        title: "",
        description: "",
        date: "",
        done: false,
        priority: "",
      });
      setShowButtonCreateOrModify("Créer");
    } else {
      setTaskForm(props.task);
      setShowButtonCreateOrModify("Modifier");
    }
  }, [props.isModified]);

  useEffect(() => {
    //state pour les champs
    if (props.isModified) {
      setTaskForm(props.task);
      //setShowButtonCreateOrModify("Modifier")
    }
  }, [props.task._id]);

  enum FormFields {
    StringField,
    TextAreaField,
    DateField,
    CheckBoxField,
    RodioButtonFiled,
  }

  function handleChange<T>(value: T, TypeField: number): void {
    if (TypeField === FormFields.StringField) {
      // setTitle(value as string);
      setTaskForm({ ...taskForm, title: value as string });
    }
    if (TypeField === FormFields.TextAreaField) {
      // setDescription(value as string);
      setTaskForm({ ...taskForm, description: value as string });
    }
    if (TypeField === FormFields.DateField) {
      // setDate(value as string);
      setTaskForm({ ...taskForm, date: value as string });
    }
    if (TypeField === FormFields.CheckBoxField) {
      // setDone(value as boolean);
      setTaskForm({ ...taskForm, done: value as boolean });
    }
    if (TypeField === FormFields.RodioButtonFiled) {
      // setDone(value as boolean);
      setTaskForm({ ...taskForm, priority: value as string });
    }
  }

  function modifyTask(e: any) {
    e.preventDefault();
    let validate = true;
    if (taskForm.title === "") {
      settitleVisibility("titleErrorVisible");
      validate = false;
    } else {
      settitleVisibility("titleErrorHidden");
    }

    if (taskForm.description === "") {
      setdescriptionVisibility("descriptionErrorVisible");
      validate = false;
    } else {
      setdescriptionVisibility("descriptionErrorHidden");
    }

    if (taskForm.date === "") {
      setdateVisibility("dateErrorVisible");
      validate = false;
    } else {
      setdateVisibility("dateErrorHidden");
    }

    if (validate) {
      props.addTaskInComponentTask(taskForm, props.isModified);
    }

    return validate;
  }

  return (
    <div className="right-side">
      <form onSubmit={modifyTask}>
        <input
          type="text"
          placeholder="titre"
          value={taskForm.title}
          onChange={(event) =>
            handleChange(event.target.value, FormFields.StringField)
          }
        />
        <div className={titleVisibility}>Veuillez saisir le champs titre</div>
        <textarea
          name="description"
          id="description"
          placeholder="Description"
          value={taskForm.description} // Liaison de la valeur de la description
          onChange={(event) =>
            handleChange(event.target.value, FormFields.TextAreaField)
          }
        ></textarea>
        <div className={descriptionVisibility}>
          Veuillez saisir le champs Description
        </div>
        <input
          type="date"
          placeholder="date"
          value={taskForm.date}
          onChange={(event) =>
            handleChange(event.target.value, FormFields.DateField)
          }
        />
        <div className={dateVisibility}>Veuillez saisir le champs date</div>
        <div className="input-check">
          <label htmlFor="done">Done</label>
          <input
            type="checkbox"
            name="done"
            id="done"
            checked={taskForm.done}
            onChange={(event) =>
              handleChange(event.target.checked, FormFields.CheckBoxField)
            }
          />
        </div>

        <div className="input-check">
          <fieldset>
            <legend>Priorité</legend>
            <div>
              <input
                type="radio"
                id="oui"
                name="priority"
                value="oui"
                checked={taskForm.priority! === "oui"}
                onClick={(event) =>
                  handleChange(
                    (event.target as HTMLInputElement).value,
                    FormFields.RodioButtonFiled
                  )
                }
              />
              <label htmlFor="oui">oui</label>

              <input
                type="radio"
                id="non"
                name="priority"
                value="non"
                checked={taskForm.priority! === "non"}
                onClick={(event) =>
                  handleChange(
                    (event.target as HTMLInputElement).value,
                    FormFields.RodioButtonFiled
                  )
                }
              />
              <label htmlFor="non">non</label>
            </div>
          </fieldset>
        </div>

        <div className="btn-form">
          <input
            className="btn-creation"
            type="submit"
            value={showButtonCreateOrModify}
          />
          <input className="btn-annule" type="button" value="Annulé" />
        </div>
      </form>
    </div>
  );
};

export default TasksFormObject;
