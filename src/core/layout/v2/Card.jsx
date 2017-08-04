import React from 'react';
import PropTypes from 'prop-types';

const Card = props => (
  <section className="box">
    <header className="panel_header">
      <h2 className="title pull-left">{props.title}</h2>
      <div className="actions panel_actions pull-right">
        {/* <a className="box_toggle fa fa-chevron-down"></a>
        <a className="box_setting fa fa-cog" data-toggle="modal" href="#section-settings"></a>
        <a className="box_close fa fa-times"></a> */}
      </div>
    </header>
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
