import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Register.css"
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Login() {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });

  const generateError = (error) =>console.log(error);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  const buttonStyle = {
    backgroundColor: 'white',
    border: '2px solid #008CBA',
    color: 'black',
    padding: '2px 4px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '2px 1px',
    cursor: 'pointer',
  };
  return (  
    <div className="container">
      <div className="register-form">
        <h2>Login here</h2>
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
          <button style={buttonStyle} type="submit">Submit</button>
          <span style={{display:'block',margin:'5px'}}>
          Don't have an account ?<Link to="/register"> Register </Link>
        </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
