import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import MasteryTestList from './MasteryTestList';
import MasteryTestListService from '../services/MasteryTestListService';

class MasteryTestListContainer extends Component {

  componentDidMount() {
    MasteryTestListService.handleLoad(this.props.moduleId);
  }

  static propTypes = {
    moduleId: PropTypes.string.isRequired,
  }

  render() {
    return (
      <MasteryTestList
        masteryTests={toJS(MasteryTestListService.masteryTests)}
        fetching={MasteryTestListService.fetch.fetching}
        onDelete={MasteryTestListService.handleRemove}
      />
    );
  }
}

export default observer(MasteryTestListContainer);
