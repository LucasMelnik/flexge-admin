import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Icon from './Icon';
import Async from './Async';

const Breadcrumb = props => (
  <Async
    fetching={props.fetching}
    size="xs"
  >
    <ol className="breadcrumb">
      <li>
        <Link to="/">
          <Icon name="fa-home" />
          Home
        </Link>
      </li>
      {props.crumbs.map((crumb, index) => (
        <li
          key={`crumb-${crumb.link}`}
          className={`${(index === props.crumbs.length - 1) ? 'active' : ''}`}
        >
          {(index === props.crumbs.length - 1)
            ? (<strong>{crumb.text}</strong>)
            : (
              <Link to={crumb.link}>
                {crumb.icon && (
                  <Icon name={crumb.icon} />
                )}
                {crumb.text}
              </Link>
            )}
        </li>
      ))}
    </ol>
  </Async>
);

Breadcrumb.propTypes = {
  crumbs: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string.isRequired,
  })),
  fetching: PropTypes.bool,
};

Breadcrumb.defaultProps = {
  fetching: false,
};

export default Breadcrumb;
