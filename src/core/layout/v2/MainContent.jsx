import React from 'react';
import PropTypes from 'prop-types';

const MainContent = props => (
  <section id="main-content">
    <section
      className="wrapper"
      style={{
        marginTop: 60,
        display: 'inline-block',
        width: '100%',
        padding: '15px 0 0 15px',
      }}
    >
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="page-title">
          ...
        </div>
      </div>
      <div className="clearfix" />
      <div className="col-lg-12">
        <section className="box ">
          {props.children}
        </section>
      </div>
    </section>
  </section>
);

MainContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContent;
