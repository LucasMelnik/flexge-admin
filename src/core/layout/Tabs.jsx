import React from 'react';
import PropTypes from 'prop-types';
import { Tabs as AntTabs } from 'antd';

const Tabs = props => (
  <AntTabs
    defaultActiveKey={(props.tabs[0].key || props.tabs[0].title)}
    tabBarExtraContent={props.actions}
  >
    {props.tabs.map(tab => (
      <AntTabs.TabPane
        tab={tab.title}
        key={tab.key || tab.title}
      >
        {tab.content}
      </AntTabs.TabPane>
    ))}
  </AntTabs>
);

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.oneOfType(PropTypes.string, PropTypes.node).isRequired,
    content: PropTypes.node.isRequired,
    icon: PropTypes.string,
    key: PropTypes.string,
  })).isRequired,
  actions: PropTypes.node,
};

Tabs.defaultProps = {
  actions: null,
};

export default Tabs;
