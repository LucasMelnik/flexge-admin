import React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs as MaterialTabs,
  Tab,
} from 'material-ui/Tabs';
import { indigo700 } from 'material-ui/styles/colors';

const Tabs = props => (
  <MaterialTabs
    inkBarStyle={{
      backgroundColor: indigo700,
    }}
  >
    {props.tabs.map(tab => (
      <Tab
        key={tab.label}
        label={tab.label}
      >
        {tab.content}
      </Tab>
    ))}
  </MaterialTabs>
);

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
  })).isRequired,
};

export default Tabs;
