import React from "react";
import { Link } from "react-router-dom";
import './BottomNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAddressBook, faUser } from '@fortawesome/free-solid-svg-icons';

function BottomNav() {
  return (
    <div className="bottom-nav">
      <Link to="/" className="nav-tab">
        <FontAwesomeIcon icon={faHome} />
      </Link>
      <Link to="/contact" className="nav-tab">
        <FontAwesomeIcon icon={faAddressBook} />
      </Link>
      <Link to="/profile" className="nav-tab">
        <FontAwesomeIcon icon={faUser} />
      </Link>
    </div>
  );
}

export default BottomNav;
