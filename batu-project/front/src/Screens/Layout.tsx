import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Layout.css";
import Cookies from "universal-cookie";


export function Layout({ children }: PropsWithChildren) {
    const navigate = useNavigate();
  
  function signout(){
    const cookies =new Cookies();
    cookies.remove("token");
    
        navigate("/login");
    }
      
  
  return (
    <div>
      <nav className="navbar">
        <button className="buton">
          <a href="/">Home</a>
        </button>
        <button
          className="buton"
          onClick={() => {
            navigate("/profile");
          }}
        >Profile
        </button>
        <button
          className="buton"
          onClick={() => {
            navigate("/cars");
          }}
        >Cars
        </button>
        <button className="buton" onClick={() => {
            navigate("/login");
          }}>Login
        </button>
        <button className="buton" onClick={() => {
            navigate("/signup");
          }} >Signup</button>
          <button className="buton" onClick={() => {
            signout();
            
          }} >Signout</button>
      </nav>
      {children}
    </div>
  );
}
