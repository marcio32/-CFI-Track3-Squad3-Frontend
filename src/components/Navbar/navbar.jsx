// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ handleLogout }) => {


  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
          Logout
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
