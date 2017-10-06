import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// import { browserHistory } from 'react-router';
import StudentDetailDateRecordList from './StudentDetailDateRecordList';

class StudentDetailDateRecordListContainer extends Component {
  //
  // static propTypes = {
  //   schoolId: PropTypes.string.isRequired,
  //   classId: PropTypes.string.isRequired,
  // };

  componentDidMount() {
    // StudentRecordListService.init(this.props.classId);
  }

  data = [
    {
      id: '7',
      date: '21212 02121',
      curso: 'A1',
      unit: 'Test',
      time: '00:10',
    },
    {
      id: '5',
      date: '21212 02121',
      curso: 'A1',
      unit: 'Test',
      time: '00:10',
    },
    {
      id: '4',
      date: '21212 02121',
      curso: 'A1',
      unit: 'Test',
      time: '00:10',
    },
    {
      id: '2',
      date: '21212 02121',
      curso: 'A1',
      unit: 'Test',
      time: '00:10',
    },
  ];

  render() {
    return (
      <StudentDetailDateRecordList
        contents={this.data}//toJS(StudentRecordListService.students)}
        fetching={false}//StudentRecordListService.fetch.fetching}
      />
    );
  }
}

export default observer(StudentDetailDateRecordListContainer);
