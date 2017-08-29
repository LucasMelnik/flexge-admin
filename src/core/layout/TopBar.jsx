import React from 'react';
import { browserHistory } from 'react-router';

const TopBar = () => (
  <div className="page-topbar">
    <div className="logo-area" />
    <div className="quick-area">
      <div className="pull-left">
        <ul className="info-menu left-links list-inline list-unstyled">
          <li className="">
            <a data-toggle="sidebar" className="sidebar_toggle">
              <i className="fa fa-expand" />
            </a>
          </li>
          {/* <li className="">
            <a href="#" data-toggle="dropdown" className="toggle">
              <i className="fa fa-envelope"></i>
              <span className="badge badge-primary">7</span>
            </a>
              <ul className="dropdown-menu messages animated fadeIn">
                <li className="list">
                  <ul className="dropdown-menu-list list-unstyled ps-scrollbar">
                    ...
                  </ul>
                </li>
              </ul>
          </li>
          <li className="">
            ...
          </li>
          <li className="hidden-sm hidden-xs searchform">
            <div className="input-group">
              <span className="input-group-addon input-focus">
                <i className="fa fa-search"></i>
              </span>
              <form action="search-page.html" method="post">
                <input type="text" className="form-control animated fadeIn" placeholder="Search & Enter" />
                <input type='submit' value="" />
              </form>
            </div>
          </li> */}
        </ul>
      </div>
      <div className="pull-right">
        <ul className="info-menu right-links list-inline list-unstyled">
          <li className="profile">
            <a data-toggle="dropdown" className="toggle">
              <i className="fa fa-bars"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-right profile animated fadeIn">
              <li>
                <a href="#settings">
                  <i className="fa fa-wrench"></i>
                  Settings
                </a>
              </li>
              <li>
                <a href="#profile">
                  <i className="fa fa-user"></i>
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
