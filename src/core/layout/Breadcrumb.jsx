import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import Icon from './Icon';
import Async from './Async';
import Separator from './Separator';

const Breadcrumb = props => (
  <Async
    fetching={props.fetching}
    size="xs"
  >
    <AntBreadcrumb separator=">">
      <AntBreadcrumb.Item>
        <Link to="/">
          <Icon
            name="home"
            style={{
              marginRight: 5,
            }}
          />
          Home
        </Link>
      </AntBreadcrumb.Item>
      {props.crumbs.map((crumb, index) => (
        <AntBreadcrumb.Item
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
        </AntBreadcrumb.Item>
      ))}
    </AntBreadcrumb>
    <Separator size="xs" />
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
  crumbs: [],
};

export default Breadcrumb;
