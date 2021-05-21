import React from "react";
import { Route, Routes } from "react-router";
import NewPost from "../Home/NewPost";
import Profile from "../Home/Profile";

import Home from "./Home";

const index = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewPost />} />
      <Route path="/user/:id" element={<Profile />} />
    </Routes>
  );
};

export default index;
