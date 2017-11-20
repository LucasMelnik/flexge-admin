import React from 'react';
import PropTypes from 'prop-types';
import { Tabs as AntTabs } from 'antd';

const Tabs = props => (
  <AntTabs defaultActiveKey={props.tabs[0].title}>
    {props.tabs.map(tab => (
      <AntTabs.TabPane
        tab={tab.title}
        key={tab.title}
      >
        {tab.content}
      </AntTabs.TabPane>
    ))}
  </AntTabs>
);

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    icon: PropTypes.string,
  })).isRequired,
};

export default Tabs;
