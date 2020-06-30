import React, { useState } from "react";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';


function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [isFocused, setFocused] = React.useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function handleFocus(e) {
    setFocused(true);
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    setFocused(false);
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        <input style={{display: !isFocused ? "none" : ""}}
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onFocus={handleFocus}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={!isFocused ? 1 : 3}
        />
        <Zoom in={isFocused} style={{display: isFocused ? "" : "none"}}>
          <Fab aria-label="add" onClick={submitNote}><AddIcon /></Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
