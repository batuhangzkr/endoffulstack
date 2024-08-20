import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Cars, Home, Layout, Login, Profile, Signup } from "./Screens/";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ToastContainer />
        <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cars" element={<Cars />} />
        </Routes>
        </Layout>
      </BrowserRouter>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
