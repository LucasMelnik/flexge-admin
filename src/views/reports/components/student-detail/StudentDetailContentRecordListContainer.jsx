import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// import { browserHistory } from 'react-router';
import StudentDetailContentRecordList from './StudentDetailContentRecordList';

class StudentDetailContentRecordListContainer extends Component {
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
      id: '1',
      name: 'Test',
      time: '00:10',
      children: [
        {
          id: '5',
          name: 'Test',
          time: '00:10',
          children: [
            {
              id: '6',
              name: 'Test',
              time: '00:10',
              children: [
                {
                  id: '7',
                  name: 'Test',
                  time: '00:10',
                },
                {
                  id: '31',
                  name: 'Test',
                  time: '00:10',
                },
                {
                  id: '32',
                  name: 'Test',
                  time: '00:10',
                },
                {
                  id: '33',
                  name: 'Test',
                  time: '00:10',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '3',
      name: 'Test',
      time: '00:10',
    },
    {
      id: '4',
      name: 'Test',
      time: '00:10',
    },
  ];

  render() {
    return (
      <StudentDetailContentRecordList
        contents={this.data}//toJS(StudentRecordListService.students)}
        fetching={false}//StudentRecordListService.fetch.fetching}
      />
    );
  }
}

export default observer(StudentDetailContentRecordListContainer);
