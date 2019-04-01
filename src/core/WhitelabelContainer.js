import React from 'react';
import { observer } from 'mobx-react';
import WhitelabelContext from './WhitelabelContext';
import WhitelabelService from './services/WhitelabelService';
import Async from './layout/Async';

class WhitelabelContainer extends React.Component {

  whitelabelService = new WhitelabelService();
  componentDidMount() {
    this.whitelabelService.load();
  }

  render() {
    return (
      <WhitelabelContext.Provider value={this.whitelabelService.config}>
        <Async fetching={this.whitelabelService.isFetching}>
          {this.props.children}
        </Async>
      </WhitelabelContext.Provider>
    );
  }
}

export default observer(WhitelabelContainer);