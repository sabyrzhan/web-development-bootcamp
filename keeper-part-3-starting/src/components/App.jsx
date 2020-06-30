import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
    var [notes, setNotes] = React.useState([]);

    return (
        <div>
            <Header/>
            <CreateArea setNotes={setNotes} />
            {notes.map((note, i) => <Note onDelete={() => {
                setNotes(prev => {
                   return prev.filter((x, index) => index != i);
                });
            }} id={i} key={i + 1} title={note.title} content={note.content}/>)}
            <Footer/>
        </div>
    );
}

export default App;
