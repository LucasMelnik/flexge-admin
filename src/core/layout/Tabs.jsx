import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tabs extends Component {

  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
      icon: PropTypes.string,
    })).isRequired,
  };

  state = { active: 0 };

  handleChangeTab = index => {
    this.setState({
      active: index,
    });
  };

  renderTabContent = () => {
    return this.props.tabs[this.state.active].content;
  };

  render() {
    return (
      <div>
        <ul className="nav nav-tabs nav-justified primary">
          {this.props.tabs.map((tab, index) => (
            <li
              key={`tab-${tab.title}`}
              className={this.state.active === index ? 'active' : ''}
            >
              <a onClick={() => this.handleChangeTab(index)}>
                {tab.icon && (
                  <i className={`fa ${tab.icon}`}/>
                )}
                {tab.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="tab-content primary">
          <div className="tab-pane active">
            {this.renderTabContent()}
          </div>
        </div>
      </div>
    );
  }
}
