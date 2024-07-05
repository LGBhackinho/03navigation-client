// src/App.tsx
import React from "react";
import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Sidebar from "./component/SideBar";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import About from "./pages/About";

const App: React.FC = () => {
  const [title, setTitle] = useState("");

  return (
    <div className="container">
      <Router>
        <Sidebar onChangeSideBar={(title: string) => setTitle(title)} />
        <div className="header-general">
          <Header title={title} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
