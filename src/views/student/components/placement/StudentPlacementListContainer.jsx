import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentPlacementListService from '../../services/StudentPlacementListService';
import StudentPlacementList from './StudentPlacementList';

class StudentPlacementListContainer extends Component {

  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    StudentPlacementListService.init(this.props.studentId);
  }

  render() {
    return (
      <StudentPlacementList
        placements={toJS(StudentPlacementListService.placements)}
        fetching={StudentPlacementListService.fetch.fetching}
        onDelete={StudentPlacementListService.handleRemove}
      />
    );
  }
}

export default observer(StudentPlacementListContainer);
