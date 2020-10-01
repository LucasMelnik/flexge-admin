import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { formatTimeFromSeconds } from '../../../core/util';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';
import replace from 'lodash/replace';
import StatusItem from '../../../core/layout/StatusItem';

const MasteryTestList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Mastery Test',
        path: 'index',
        sort: true,
        width: '130px',
      },
      {
        label: 'Percentage to Activate',
        path: 'modulePercentageToActive',
        sort: true,
        width: '180px',
      },
      {
        label: 'Deadline Time',
        path: 'deadlineTime',
        width: '110px',
        render: (cell, row) => formatTimeFromSeconds(row.deadlineTime),
      },
      {
        label: 'Score to Pass',
        path: 'scoreToPass',
        width: '110px',
      },
      {
        label: 'Items Count',
        path: 'itemsCount',
        width: '105px',
      },
      {
        label: 'Grammars',
        path: 'grammars',
        render: value => !value || !value.length ? 'No grammars found' : value.reduce((aac, g, index) => aac.concat(index ? ', ' : '').concat(g.name), '')
      },
      {
        label: 'Status Format',
        path: 'review.statusFormat',
        width: '150px',
        render: value => (
          <StatusItem
            color={{
              PENDING: '#ef8c3b',
              APPROVED: '#009687',
              NOT_APPROVED: '#FF5233',
              AWAITING_REVIEW: '#758C98',
            }[value || 'AWAITING_REVIEW']}
            text={replace((value || 'AWAITING_REVIEW'), '_', ' ')}
          />
        ),
      },
      {
        label: 'Status Content',
        path: 'review.statusContent',
        width: '150px',
        render: value => (
          <StatusItem
            color={{
              PENDING: '#ef8c3b',
              APPROVED: '#009687',
              NOT_APPROVED: '#FF5233',
              AWAITING_REVIEW: '#758C98',
            }[value || 'AWAITING_REVIEW']}
            text={replace((value || 'AWAITING_REVIEW'), '_', ' ')}
          />
        ),
      },
      {
        label: 'Actions',
        path: 'action',
        width: '125px',
        render: (cell, row) => {
          return (
            <div>
              <Button
                icon="delete"
                onClick={() => props.onDelete(row.module.id, row.id)}
              />
              {' '}
              <Button
                icon="edit"
                onClick={() => browserHistory.push(`/modules/${row.module.id}/mastery-tests/${row.id}`)}
              />
              {' '}
              <form
                action={`${process.env.REACT_APP_STUDENT_API_URL}/public/tasting`}
                target="_blank"
                method="post"
                style={{display: 'inline-block'}}
              >
                <input type="hidden" name="function" value="mastery"/>
                <input type="hidden" name="locale" value="pt-br"/>
                <input type="hidden" name="course" value={row.module.course}/>
                <input type="hidden" name="module" value={row.module.id}/>
                <input type="hidden" name="masteryTest" value={row.id}/>
                <Button
                  icon="select"
                  buttonType="submit"
                />
              </form>
            </div>
          );
        },
      },
    ]}
    rows={props.masteryTests}
  />
);

MasteryTestList.propTypes = {
  masteryTests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    modulePercentageToActive: PropTypes.string.isRequired,
    scoreToPass: PropTypes.number.isRequired,
    module: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
};

MasteryTestList.defaultProps = {
  onDelete: null,
};

export default MasteryTestList;
