import React from 'react';
import { observer } from 'mobx-react';
import WhitelabelContext from './WhitelabelContext';
import WhitelabelService from './services/WhitelabelService';
import Async from './layout/Async';

class WhitelabelContainer extends React.Component {

  componentDidMount() {
    WhitelabelService.load();
  }

  render() {
    return (
      <WhitelabelContext.Provider value={WhitelabelService.config}>
        <div
          style={WhitelabelService.isFetching ? {
            display: 'flex',
            flex: 1,
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
          } : {}}
        >
          <Async fetching={WhitelabelService.isFetching}>
            {this.props.children}
          </Async>
        </div>
      </WhitelabelContext.Provider>
    );
  }
}

export default observer(WhitelabelContainer);