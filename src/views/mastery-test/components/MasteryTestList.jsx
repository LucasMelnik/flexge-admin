import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Paper from '../../../core/layout/Paper';
import Separator from '../../../core/layout/Separator';
import Divider from '../../../core/layout/Divider';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';

const MasteryTestList = props => (
  <Paper
    flexible
  >
    <Async fetching={props.fetching}>
      <div>
        <Separator />
        <Divider />
        <Table
          columns={[
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
            },
            {
              label: 'Score to Pass',
              path: 'scoreToPass',
            },
          ]}
          rows={props.masteryTests}
          selectable
          onSelect={row => browserHistory.push(`/modules/${row.module}/mastery-tests/${row.id}`)}
          onDelete={row => props.onDelete(row.module, row.id)}
        />
      </div>
    </Async>
  </Paper>
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
