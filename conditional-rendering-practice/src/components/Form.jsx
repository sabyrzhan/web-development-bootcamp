import React from "react";

function Form(p) {
  return (
    <form className="form">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
        {!p.isRegistered && <input type="password" placeholder="Confirm Password" />}
      <button type="submit">{p.isRegistered ? 'Login' : 'Register'}</button>
    </form>
  );
}

export default Form;
