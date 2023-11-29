import React from "react";
import { Link } from "react-router-dom";
import "./sideBar.scss";

function SideBar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/exam">İmtahan nəticələri</Link>
        </li>
        <li>
          <Link to="/lesson">Dərslər</Link>
        </li>
        <li>
          <Link to="/teacher">Müəllimlər</Link>
        </li>
        <li>
          <Link to="/student">Tələbələr</Link>
        </li>
        <li>
          <Link to="/class">Siniflər</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
