import React from 'react';
import PropTypes from 'prop-types';

const MainContent = props => (
  <section id="main-content">
    <section
      className="wrapper"
      style={{
        display: 'inline-block',
        width: '100%',
        padding: '120px 15px 15px 15px',
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
