import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../core/layout/Card';
import Spinner from '../../core/content/Spinner';
import Table from '../../core/content/Table';

const SchoolList = props => (
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
          {
            label: 'Company',
            path: 'company',
          },
        ]}
        rows={props.schools}
        selectable
      />
    )}
  </Card>
);

SchoolList.propTypes = {
  schools: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default SchoolList;
