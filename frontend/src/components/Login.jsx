import React, { useState, useEffect } from "react";
import FormComponent from "./FormComponent";
import axios from "axios";
import "../css/Register.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {API_URL} from "./config";

function Login() {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const [formEdited,setFormEdited] = useState(false);

  const generateError = (error) => alert(error);

  const handleSubmit = async (event) => {
    // event.preventDefault();
    try {
      const { data } = await axios.post(
        API_URL+"/login",
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
      alert(ex);
    }
  };

  useEffect(() => {
    if (formEdited && values.email !== '' && values.password!=='') {
      handleSubmit();
    }
  }, [values,formEdited]);

  function handleChange(user) {
    setValues(user);  
    setFormEdited(true);  
  }

  return (
    <FormComponent onSubmitForm={handleChange} Reg={false} />
  );
}

export default Login;
