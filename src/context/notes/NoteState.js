import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //Get all Note
  const getNotes = async () => {
    // Make API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhZTliNjZkZmVmNjUyMmIyZjNlYTIzIn0sImlhdCI6MTY4OTE4Mjg4OH0.15_FIdF9YLjvXs_J3_c0DcrijTk9XSAF_edx91QD_yU", 
      },
    });
    const json = await response.json();

    setNotes(json);
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    //Todo : API Call
    // Make API Call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhZTliNjZkZmVmNjUyMmIyZjNlYTIzIn0sImlhdCI6MTY4OTE4Mjg4OH0.15_FIdF9YLjvXs_J3_c0DcrijTk9XSAF_edx91QD_yU", 
      },
      body: JSON.stringify({title, description, tag})
    });
    const note = await response.json();
    setNotes(notes.concat(note));
    
  };


  //Delete a Note
  const deleteNote =async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhZTliNjZkZmVmNjUyMmIyZjNlYTIzIn0sImlhdCI6MTY4OTE4Mjg4OH0.15_FIdF9YLjvXs_J3_c0DcrijTk9XSAF_edx91QD_yU", 
      }
    });
    const json = await response.json();
    
    //logic to delete 
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };


  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhZTliNjZkZmVmNjUyMmIyZjNlYTIzIn0sImlhdCI6MTY4OTE4Mjg4OH0.15_FIdF9YLjvXs_J3_c0DcrijTk9XSAF_edx91QD_yU", 
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();

    //logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
