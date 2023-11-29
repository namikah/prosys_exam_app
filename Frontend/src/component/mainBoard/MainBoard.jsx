import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Exam from "../exam/Exam";
import Teacher from "../teacher/Teacher";
import Student from "../student/Student";
import Lesson from "../lesson/Lesson";
import Group from "../group/Group";

function MainBoard() {
  return (
    <Routes>
    <Route path={"/exam"} exact element={<Exam/>} />
    <Route path={"/teacher"} exact element={<Teacher/>} />
    <Route path={"/student"} exact element={<Student/>} />
    <Route path={"/lesson"} exact element={<Lesson/>} />
    <Route path={"/class"} exact element={<Group/>} />
    <Route element={<Exam />} />
  </Routes>
  );
}

export default MainBoard;
