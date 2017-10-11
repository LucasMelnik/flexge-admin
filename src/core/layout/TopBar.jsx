import React from 'react';
import { browserHistory, Link } from 'react-router';

const TopBar = () => (
  <div className="page-topbar">
    <div
      className="logo-area"
    >
      <Link to="/">
        <span
          style={{
            width: 240,
            height: '100%',
            position: 'absolute',
          }}
        />
      </Link>
    </div>
    <div className="quick-area">
      <div className="pull-right">
        <ul className="info-menu right-links list-inline list-unstyled">
          <li className="profile">
            <a data-toggle="dropdown" className="toggle">
              <i className="fa fa-bars" />
            </a>
            <ul className="dropdown-menu dropdown-menu-right profile animated fadeIn">
              <li>
                <a href="#settings">
                  <i className="fa fa-wrench" />
                  Settings
                </a>
              </li>
              <li>
                <a href="#profile">
                  <i className="fa fa-user" />
                  Profile
                </a>
              </li>
              <li>
                <a href="#help">
                  <i className="fa fa-info" />
                  Help
                </a>
              </li>
              <li
                className="last"
                onClick={() => {
                  localStorage.clear();
                  browserHistory.push('/');
                  window.location.reload();
                }}
              >
                <a>
                  <i className="fa fa-lock" />
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default TopBar;
