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
        padding: '15px 15px 0 15px',
      }}
    >
      {props.children}
    </section>
  </section>
);

MainContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContent;
