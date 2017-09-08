import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import PracticeTestListItems from './PracticeTestListItems';
import DeletePracticeTestItemService from '../services/DeletePracticeTestItemService';
import PracticeTestListItemsService from '../services/PracticeTestListItemsService';

class PracticeTestListItemsContainer extends Component {

  static propTypes = {
    practiceTestId: PropTypes.string,
  };

  componentWillMount() {
    PracticeTestListItemsService.init(this.props.practiceTestId);
  }

  render() {
    return (
      <PracticeTestListItems
        items={toJS(PracticeTestListItemsService.items)}
        fetching={PracticeTestListItemsService.fetch.fetching}
        onDelete={DeletePracticeTestItemService.handleRemove}
        onSaveSuccess={PracticeTestListItemsService.handleLoad}
        onOrderChange={PracticeTestListItemsService.handleOrderChange}
      />
    );
  }
}

export default observer(PracticeTestListItemsContainer);
