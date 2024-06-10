import React, { useState } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  return (
    <header className="header">
      <div className="header-main-wrapper">
        <p>ReserveEat</p>
        <div className="user-section">
          <FontAwesomeIcon icon={faCircleUser} color="white" />
          <span>Adam Smith</span>
          <FontAwesomeIcon
            icon={faCaretDown}
            color="white"
            onClick={toggleDropdown}
          />
          {isDropdownVisible && (
            <div className="dropdown-menu">
              <p>Sign out</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
