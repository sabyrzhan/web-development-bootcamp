import React from "react";
import entries from "../emojipedia";
import Entry from "./Entry";

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
        {entries.map(item => <Entry emoji={item.emoji} name={item.name} meaning={item.meaning} />)}
      </dl>
    </div>
  );
}

export default App;
