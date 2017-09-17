import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import find from 'lodash/find';
import StudentPlacementListService from '../../services/StudentPlacementListService';
import PlacementTestListService from '../../../placement-test/services/PlacementTestListService';
import StudentPlacementList from './StudentPlacementList';

class StudentPlacementListContainer extends Component {

  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    StudentPlacementListService.init(this.props.studentId);
    PlacementTestListService.load();
  }

  render() {
    let placements;
    if (StudentPlacementListService.fetch.fetching || PlacementTestListService.fetch.fetching) {
      placements = [];
    } else {
      placements = toJS(StudentPlacementListService.placements.map((placement) => {
        const ptWithOrderAndLevel = {
          ...placement,
          answeredItems: placement.answeredItems.map((item) => {
            const grammarPlacementTestLevel = find(
              PlacementTestListService.placementTests,
              pt => find(pt.items, itemId => itemId === item.item),
            );
            return {
              ...item,
              order: grammarPlacementTestLevel ? grammarPlacementTestLevel.order : 0,
              level: grammarPlacementTestLevel ? grammarPlacementTestLevel.placementTestLevel.level : 0,
            };
          }),
        };
        return ptWithOrderAndLevel;
      }));
    }
    return (
      <StudentPlacementList
        placements={placements}
        fetching={StudentPlacementListService.fetch.fetching}
        onDelete={StudentPlacementListService.handleRemove}
      />
    );
  }
}

export default observer(StudentPlacementListContainer);
