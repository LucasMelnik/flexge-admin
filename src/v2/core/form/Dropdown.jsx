import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = props => (
  <div className="btn-group bottom15 right15">
    <div className="dropdown">
      <button
        className={`btn btn-${props.type} dropdown-toggle`}
        type="button"
        id={props.id}
        data-toggle="dropdown"
        aria-expanded="true"
      >
        {props.label}
        <span className="caret" />
      </button>
      <ul
        className="dropdown-menu"
        role="menu"
        aria-labelledby={props.id}
      >
        {props.items.map(item => (
          <li
            role="presentation"
            key={item.label}
          >
            <a
              role="menuitem"
              tabIndex="-1"
              href="#"
              onClick={item.onClick}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

Dropdown.propTypes = {
  type: PropTypes.oneOf([
    'default',
    'primary',
    'success',
    'info',
    'warning',
    'danger',
    'purple',
    'accent',
    'secondary',
  ]),
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  })).isRequired,
};

Dropdown.defaultProps = {
  type: 'primary',
};

export default Dropdown;
