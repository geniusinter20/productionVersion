import React, { useState } from "react";
import { aboutDropdown } from "./NavItems";
import {Link} from "react-router-dom";

import "./Dropdown.css";

function Dropdown1() {
  const [dropdown1, setDropdown1] = useState(false);

  return (
    <>
      <ul
        className={dropdown1 ? "services-submenu clicked" : "services-submenu"}
        onClick={() => setDropdown1(!dropdown1)}
      >
        {aboutDropdown.map((item) => {
          return (
            <li key={item.id}>
              <Link
                to={item.path}
                className={item.cName}
                style={{fontSize:"1rem"}}
                onClick={() => setDropdown1(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown1;