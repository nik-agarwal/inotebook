import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
    //eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const [note, setNote] = useState({ etitle: "", edescription: "", etag: ""});

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({etitle : currentNote.title, edescription : currentNote.description, etag : currentNote.tag});
  };
  

  const handleClick = (e) => {
    console.log("updating the note...", note);
    e.preventDefault();
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="row g-3 ">
                <div className=" mb-2">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" onChange={onchange} />
                </div>
                <div className=" mb-2">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onchange} />
                </div>
                <div className=" mb-2">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onchange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
