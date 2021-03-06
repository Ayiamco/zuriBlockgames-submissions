import React, { useState } from "react";
import "./navBar.css";
import github from "../../assets/github.svg";
import twitter from "../../assets/twitter.svg";

function NavBar({ setModalDisplay }) {
  const [display, setDisplay] = useState("none");

  // function closeModal() {
  //   setDisplay("none");
  // }

  return (
    <div className="navBarContainer">
      <div className="navBarInnerCon">
        {/* <h3>Logoðð¾</h3> */}
        <h3>
          Ayiamco Token
          <span role="img" aria-label="wave-emoji" style={{ marginLeft: "5px" }}>
            ðð
          </span>
        </h3>
        <div className="iconCon">
          <span
            role="img"
            aria-label="notification-emoji"
            className="notificationBell"
            onClick={() => {
              setModalDisplay("flex");
            }}
          >
            ð¡
          </span>
          <span
            role="img"
            aria-label="menu-emoji"
            className="hamburgerMenu"
            onClick={() => {
              setDisplay("block");
            }}
          >
            â°
          </span>
        </div>
        <div className="menuCon" style={{ display: display }}>
          <div className="menuConWrapper">
            <span
              role="img"
              aria-label="closeButton-emoji"
              className="menuCloseButton"
              onClick={() => {
                setDisplay("none");
              }}
            >
              âï¸
            </span>
            <ul className="menuList">
              <li>
                <a
                  href="https://github.com/Ayiamco/zuriBlockgames-submissions/tree/master/task4/app-clients"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Github {<img src={github} alt="" />}
                </a>
              </li>
              <li>
                <a href="https://twitter.com/JosephAchonu" rel="noopener noreferrer" target="_blank">
                  Twitter {<img src={twitter} alt="" />}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
