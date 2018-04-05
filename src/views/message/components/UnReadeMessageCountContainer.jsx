import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Badge } from 'antd';
import UnReadMessageCountService from '../services/UnReadMessageCountService';

class UnReadeMessageCountContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    UnReadMessageCountService.init();
  }

  render() {
    return (
      <Badge
        offset={[0, 10]}
        count={toJS(UnReadMessageCountService.total)}
      >
        {this.props.children}
      </Badge>
    );
  }
}

export default observer(UnReadeMessageCountContainer);
