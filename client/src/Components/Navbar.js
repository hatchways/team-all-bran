import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../context/actions';

const links = (
  <ul>
    <li>
      <Link to='/dashboard'>Dashboard</Link>
    </li>
    <li>
      <Link to='/faq'>FAQ</Link>
    </li>
    <li>
      <Link to='/blog'>Blog</Link>
    </li>
  </ul>
);

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>All-Bran</Link>
      </h1>
      {<Fragment>{links}</Fragment>}
      <li>
        <ul>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </li>
    </nav>
  );
};

export default Navbar;
