import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';
import Table from '../../../../../core/form/Table';

const TopStudentsTable = props => (
  <Table
    fetching={props.loading}
    bordered={false}
    columns={[
      {
        label: 'Avatar',
        path: 'profilePicture',
        render: value => <img src={`${process.env.REACT_APP_API_URL}/files/${value}`} alt="avatar" />,
      },
      {
        label: 'Student',
        path: 'name',
      },
      {
        label: 'Class',
        path: 'schoolclass.name',
      },
      {
        label: 'Studied Time',
        path: 'studiedTime',
        render: value => moment.duration(value, 'seconds').format('hh:mm', { trim: false }),
      },
    ]}
    rows={props.data}
  />
);

TopStudentsTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};

TopStudentsTable.defaultProps = {
  data: [],
  loading: true,
};

export default TopStudentsTable;
