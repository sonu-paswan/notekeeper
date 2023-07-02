import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const containerStyle = {
    display: "flex",
    fontSize:20,
    marginTop:100,
    flexDirection:'column',
    alignItems: "center",
    
  };
  return (
    <div style={containerStyle}>
      <div><h2 style={{margin:20}}>Login into your account</h2></div>
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
          Don't have an account ?<Link to="/register"> Register </Link>
        </span>
      </form>
     </div>
      
    </div>
  );
}

export default Login;
