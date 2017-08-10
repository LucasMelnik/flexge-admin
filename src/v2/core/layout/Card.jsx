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
        <div
          className="pull-right"
          style={{
            padding: '25px 30px 0px 0px',
          }}
        >
          {props.actions}
        </div>
      </header>
    )}
    <div className="content-body">
      {props.children}
    </div>
  </section>
);

Card.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.node,
  children: PropTypes.node.isRequired,
};

Card.defaultProps = {
  title: null,
  actions: null,
};

export default Card;
