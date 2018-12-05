import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import InstructionList from './InstructionList';
import InstructionListService from '../../services/InstructionListService';

class InstructionListContainer extends Component {
  static propTypes = {
    onEdit: PropTypes.func.isRequired,
    itemTypeId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    InstructionListService.init(this.props.itemTypeId);
  }

  render() {
    return (
      <InstructionList
        instructions={toJS(InstructionListService.instructions)}
        fetching={InstructionListService.fetch.fetching}
        onDelete={InstructionListService.handleRemove}
        onEdit={this.props.onEdit}
      />
    );
  }
}

export default observer(InstructionListContainer);
