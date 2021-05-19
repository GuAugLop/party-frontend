import React from "react";
import { Route, Routes } from "react-router";
import NewPost from "../Home/NewPost";

import Home from "./Home";

const index = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewPost />} />
    </Routes>
  );
};

export default index;
