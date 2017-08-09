import React from 'react';
import PropTypes from 'prop-types';

const Card = props => (
  <section
    className="box"
    style={{
      height: '100%',
      margin: 0,
    }}
  >
    {props.title && (
      <header className="panel_header">
        <h2 className="title pull-left">{props.title}</h2>
      </header>
    )}
    <div className="content-body">
      {props.children}
    </div>
  </section>
);

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

Card.defaultProps = {
  title: null,
};

export default Card;
