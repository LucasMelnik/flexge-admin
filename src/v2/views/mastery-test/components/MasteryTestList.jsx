import React from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import moment from 'moment';
import 'moment-duration-format';
import Async from '../../../core/layout/Async';
import Table from '../../../core/form/Table';
import IconButton from '../../../core/form/IconButton';

const MasteryTestList = props => (
  <Async fetching={props.fetching}>
    <Table
      columns={[
        {
          label: 'ID',
          path: 'id',
          isKey: true,
          hidden: true,
        },
        {
          label: 'Mastery Test',
          path: 'index',
        },
        {
          label: 'Percentage to Activate',
          path: 'modulePercentageToActive',
        },
        {
          label: 'Deadline Time',
          path: 'deadlineTime',
          render: (cell, row) => {
            return `${row.deadlineTime < 60 ? '00:' : ''}${moment.duration(row.deadlineTime, "seconds").format("mm:ss", {forceLength: true})}`
          },
        },
        {
          label: 'Score to Pass',
          path: 'scoreToPass',
        },
        {
          label: 'Actions',
          path: 'action',
          width: '120',
          render: (cell, row) => {
            return (
              <div>
                <IconButton
                  icon="fa-trash"
                  onClick={() => props.onDelete(row.module, row.id)}
                />
              {' '}
                <IconButton
                  icon="fa-edit"
                  onClick={() => hashHistory.push(`/v2/modules/${row.module}/mastery-tests/${row.id}`)}
                />
              </div>
            );
          },
        },
      ]}
      rows={props.masteryTests}
    />
  </Async>
);

MasteryTestList.propTypes = {
  masteryTests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    modulePercentageToActive: PropTypes.string.isRequired,
    scoreToPass: PropTypes.number.isRequired,
    module: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
};

MasteryTestList.defaultProps = {
  onDelete: null,
};

export default MasteryTestList;
