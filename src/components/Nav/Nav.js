import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
// nav bar for website
  <div className="nav">
    <Link to="/home">
      <h2 className="nav-title">Love Languages</h2>
    </Link>
    <div className="nav-right">
      <Link className="nav-link" to="/home">
        {props.user.id ? 'Home' : 'Login / Register'}
      </Link>
      {props.user.id && (
        <>
          <LogOutButton className="nav-link"/>
        </>
      )}
    </div>
  </div>
  
);
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
