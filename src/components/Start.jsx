import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

function Start() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const [isLoggedin, setisLoggedin] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        // navigate("/login");
        setisLoggedin(false);
      } else {
        const { data } = await axios.post(
          "http://localhost:5000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          // navigate("/login");
          setisLoggedin(false);
        } else {
          // navigate("/home");
          setisLoggedin(true);
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    setisLoggedin(false);
  };
  const buttonStyle = {
    backgroundColor: "blue",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    margin: "5px",
    cursor: "pointer",
  };
  const containerStyle = {
    display: "flex",
    // justifyContent: "center",
    marginTop:100,
    flexDirection:'column',
    alignItems: "center",
    height: "100vh",
  };
  return (
    <div style={containerStyle}>
      <div>
        <h1 style={{ margin: 20, display: "block" }}>
          Welcome to notes making Application
        </h1>
      </div>
      {isLoggedin ? (
        <div>
          <button style={buttonStyle} onClick={()=>{navigate("/home")}}>get started</button>
          <button style={buttonStyle} onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button style={buttonStyle} onClick={()=>{navigate("/login")}}>
          Log in
        </button>
      )}
    </div>
  );
}

export default Start;
