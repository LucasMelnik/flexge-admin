import React from 'react';
import PropTypes from 'prop-types';
import { Tabs as AntTabs } from 'antd';
import { browserHistory} from 'react-router';
import qs from 'qs';

export default class Tabs extends React.Component {

  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.oneOfType(PropTypes.string, PropTypes.node).isRequired,
      content: PropTypes.node.isRequired,
      icon: PropTypes.string,
    })).isRequired,
    actions: PropTypes.node,
  };

  static defaultProps = {
    actions: null,
  };

  componentDidMount() {
    const params = qs.parse(window.location.search.substring(1));
    if (!params || !params.activeTab) {
      params.activeTab = this.props.tabs[0].key;
      browserHistory.replace(`${window.location.pathname}?${qs.stringify(params)}`);
    }
  }

  handleTabChange = (tab) => {
    const params = qs.parse(window.location.search.substring(1));
    params.activeTab = tab;
    browserHistory.replace(`${window.location.pathname}?${qs.stringify(params)}`);
  }

  render() {
    const params = qs.parse(window.location.search.substring(1));
    return (
      <AntTabs
        activeKey={params.activeTab}
        tabBarExtraContent={this.props.actions}
        onChange={this.handleTabChange}
      >
        {this.props.tabs.map(tab => (
          <AntTabs.TabPane
            tab={tab.title}
            key={tab.key}
          >
            {tab.content}
          </AntTabs.TabPane>
        ))}
      </AntTabs>
    );
  }
}
