import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
function Register() {
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
        "http://localhost:5000/register",
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
  const containerStyle = {
    display: "flex",
    fontSize:20,
    // justifyContent: "center",  
    marginTop:100,
    flexDirection:'column',
    alignItems: "center",
    // height: "100vh",
  };
  
  return (
    <div style={containerStyle}>
      <div><h2 style={{margin:20}}>Register for creating account</h2></div>
      <div><form onSubmit={(e) => handleSubmit(e)}>
        <div style={{margin:5}}>
          <label htmlFor="email">Email</label>
          <input style={{fontSize:15}}
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div style={{margin:5}}>
          <label htmlFor="password">Password</label>
          <input style={{fontSize:15}}
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit" style={{margin:5,fontSize:20}}>Submit</button>
        <span>
          Already have an account ?<Link to="/login"> Login</Link>
        </span>
      </form></div>
      
    </div>
  );
}

export default Register;
