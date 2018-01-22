import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';
import Table from '../../../../../core/form/Table';

const TopStudentsTable = props => (
  <div>
    <h4>
      Top Students Last {props.days} days
    </h4>
    <Table
      fetching={props.loading}
      bordered={false}
      columns={[
        {
          label: 'Student',
          path: 'name',
          width: '50%',
        },
        {
          label: 'Class',
          path: 'schoolClass.name',
        },
        {
          label: 'Time',
          path: 'studiedTime',
          render: value => moment.duration(value, 'seconds').format('hh:mm', { trim: false }),
        },
      ]}
      rows={props.data}
    />
  </div>
);

TopStudentsTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  days: PropTypes.number.isRequired,
};

TopStudentsTable.defaultProps = {
  data: [],
  loading: true,
};

export default TopStudentsTable;
