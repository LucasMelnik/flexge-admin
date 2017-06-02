import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../core/layout/Card';
import Spinner from '../../../core/content/Spinner';
import Table from '../../../core/content/Table';

const StudentList = props => (
  <Card
    flexible
  >
    {props.fetching ? (
      <Spinner />
    ) : (
      <Table
        columns={[
          {
            label: 'Name',
            path: 'name',
          },
        ]}
        rows={props.students}
        selectable
      />
    )}
  </Card>
);

StudentList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default StudentList;