import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import MasteryTestListItems from './MasteryTestListItems';
import DeleteMasteryTestItemService from '../services/DeleteMasteryTestItemService';
import MasteryTestListItemsService from '../services/MasteryTestListItemsService';

class MasteryTestListItemsContainer extends Component {

  static propTypes = {
    masteryTestId: PropTypes.string.isRequired,
  };

  componentWillMount() {
    MasteryTestListItemsService.handleLoad(this.props.masteryTestId);
  }

  render() {
    return (
      <MasteryTestListItems
        masteryTestId={this.props.masteryTestId}
        items={toJS(MasteryTestListItemsService.items)}
        fetching={MasteryTestListItemsService.fetch.fetching}
        onDelete={DeleteMasteryTestItemService.handleRemove}
      />
    );
  }
}

export default observer(MasteryTestListItemsContainer);
