import "./App.css";
import SideBar from "./component/sideBar/SideBar";
import MainBoard from "./component/mainBoard/MainBoard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="m-3">
        <div className="main-board row">
          <div className="col-12 text-center mt-5 mb-5">
            <h1>İMTAHAN PROQRAMI</h1>
          </div>
          <Router>
            <div className="main-left-side col-md-3">
              <div className="main-left-side-card m-1">
                <SideBar />
              </div>
            </div>
            <div className="main-right-side col-md-9">
              <div className="main-right-side-card m-1">
                <MainBoard />
              </div>
            </div>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
