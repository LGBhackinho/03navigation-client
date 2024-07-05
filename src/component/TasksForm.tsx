// src/views/Tasks.tsx
import React, { useState } from "react";

const TasksForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [done, setDone] = useState(false);
  const [descriptionVisibility, setdescriptionVisibility] = useState(
    "descriptionErrorHidden"
  );
  const [titleVisibility, settitleVisibility] = useState("titleErrorHidden");
  const [dateVisibility, setdateVisibility] = useState("dateErrorHidden");

  enum FormFields {
    StringField,
    TextAreaField,
    DateField,
    CheckBoxField,
  }

  function handleChange<T>(value: T, TypeField: number): void {
    if (TypeField === FormFields.StringField) {
      setTitle(value as string);
    }
    if (TypeField === FormFields.TextAreaField) {
      setDescription(value as string);
    }
    if (TypeField === FormFields.DateField) {
      setDate(value as string);
    }
    if (TypeField === FormFields.CheckBoxField) {
      setDone(value as boolean);
      console.log(value);
    }
  }

  function modifyTask(e: any) {
    e.preventDefault();
    let validate;
    if (title === "") {
      settitleVisibility("titleErrorVisible");
      validate = false;
    } else {
      settitleVisibility("titleErrorHidden");
    }

    if (description === "") {
      setdescriptionVisibility("descriptionErrorVisible");
      validate = false;
    } else {
      setdescriptionVisibility("descriptionErrorHidden");
    }

    if (date === "") {
      setdateVisibility("dateErrorVisible");
      validate = false;
    } else {
      setdateVisibility("dateErrorHidden");
    }

    return validate;
  }

  return (
    <div className="right-side">
      <form onSubmit={modifyTask}>
        <input
          type="text"
          placeholder="titre"
          value={title}
          onChange={(event) =>
            handleChange(event.target.value, FormFields.StringField)
          }
        />
        <div className={titleVisibility}>Veuillez saisir le champs titre</div>
        <textarea
          name="description"
          id="description"
          placeholder="Description"
          value={description} // Liaison de la valeur de la description
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
          value={date}
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
            checked={done}
            onChange={(event) =>
              handleChange(event.target.checked, FormFields.CheckBoxField)
            }
          />
        </div>
        <div className="btn-form">
          <input className="btn-creation" type="submit" value="Création" />
          <input className="btn-annule" type="button" value="Annulé" />
        </div>
      </form>

      {/* <ul className="right-side-page">
        <li>Tache 1</li>
        <li>Tache 2</li>
        <li>Tache 3</li>
        <li>Tache 4</li>
      </ul> */}
    </div>
  );
};

export default TasksForm;
