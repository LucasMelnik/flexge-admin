import React from 'react';
import PropTypes from 'prop-types';
import Collapse, { Panel } from 'rc-collapse';
import 'rc-collapse/assets/index.css';
import './Accordion.css'

const Accordion = props => (
  <Collapse accordion>
    <Panel
      header={props.header}
      headerClass="accordion-header"
    >
      {props.children}
    </Panel>
  </Collapse>
);

Accordion.propTypes = {
  header: PropTypes.node,
  children: PropTypes.node,
};

Accordion.defaultProps = {
  header: null,
  children: null,
};

export default Accordion;
