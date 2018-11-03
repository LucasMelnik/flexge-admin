import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import ParentList from './ParentList';
import ParentListService from '../../services/ParentListService';

class ParentListContainer extends Component {
  static propTypes = {
    onEdit: PropTypes.func.isRequired,
    studentId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    ParentListService.init(this.props.studentId);
  }

  render() {
    return (
      <ParentList
        parents={toJS(ParentListService.parents)}
        fetching={ParentListService.fetch.fetching}
        onDelete={ParentListService.handleDelete}
        onEdit={this.props.onEdit}
      />
    );
  }
}

export default observer(ParentListContainer);
