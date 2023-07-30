import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({id : "", title: "", description: "", tag: ""})
    props.showAlert("Added Successfully","success");
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h1>Add a Note</h1>
      <form className="row g-3 ">
        <div className=" mb-1">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            value={note.title}
            id="title"
            name="title"
            onChange={onchange} minLength={5} required
          />
        </div>
        <div className=" mb-1">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={note.description}
            name="description"
            onChange={onchange} minLength={5} required
          />
        </div>
        <div className=" mb-1">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            value={note.tag}
            name="tag"
            onChange={onchange} minLength={5} required
          />
        </div>
        <div className=" mb-1">
          <button
            disabled = {note.title.length<5 || note.description.length <5}
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
