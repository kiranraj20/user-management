import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Users from "./components/Users";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
};

export default App;