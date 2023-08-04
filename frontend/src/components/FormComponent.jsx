import React, { useState} from "react";
import { Link } from "react-router-dom";
function FormComponent(props) {
  // states
  const [values, setValues] = useState({ email: "", password: "" });

  // functions
  function handleSubmit(event) {
    event.preventDefault();
    props.onSubmitForm(values);
    setValues({
      email: "",
      password: "",
    });
  }

  return (
    <div className="container">
      <div className="register-form">
        {props.Reg?(
            <h2>Register here</h2>
        ):(
            <h2>Login here</h2>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          <button className="buttonStyle" type="submit">
            Submit
          </button>
          <span style={{ display: "block", margin: "5px" }}>
            {props.Reg ? (
              <div>
                Already have an account? <Link to="/login"> Login </Link>
              </div>
            ) : (
              <div>
                Don't have an account ?<Link to="/register"> Register </Link>
              </div>
            )}
          </span>
        </form>
      </div>
    </div>
  );
}

export default FormComponent;
