import React from "react";
import Card from "./Card";

function App(p) {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      <Card
          name={p.contacts[0].name}
          image={p.contacts[0].imgURL}
          tel={p.contacts[0].phone}
          email={p.contacts[0].email}
      />
      <Card
          name={p.contacts[1].name}
          image={p.contacts[1].imgURL}
          tel={p.contacts[1].phone}
          email={p.contacts[1].email}
        />
        <Card
            name={p.contacts[2].name}
            image={p.contacts[2].imgURL}
            tel={p.contacts[2].phone}
            email={p.contacts[2].email}
        />
    </div>
  );
}

export default App;
