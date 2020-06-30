import React from "react";

function CreateArea(p) {
    var [note, setNote] = React.useState({
        title: "",
        content: ""
    });

    function addNote() {
        setNote(prev => {
            p.setNotes(prevNotes => [...prevNotes, {...prev}]);
        });
        setNote({title: "", content: ""});
    }

    function onChange(e) {
        var {value, name} = e.target;
        setNote(prev => {
            return {...prev, [name]: value};
        })
    }

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <input name="title" placeholder="Title" value={note.title} onChange={onChange} />
                <textarea name="content" placeholder="Take a note..." rows="3" onChange={onChange} value={note.content} />
                <button onClick={addNote}>Add</button>
            </form>
        </div>
    );
}

export default CreateArea;
