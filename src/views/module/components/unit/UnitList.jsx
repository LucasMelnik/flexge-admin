import React from 'react';
import PropTypes from 'prop-types';
import replace from 'lodash/replace';
import { browserHistory } from 'react-router';
import { formatTimeFromSeconds, Roles } from '../../../../core/util';
import Table from '../../../../core/form/Table';
import Button from '../../../../core/form/Button';
import StatusItem from '../../../../core/layout/StatusItem';

const typesWithImage = [
  'PRESENTATION',
  'SINGLE_CHOICE_IMAGE',
  'SINGLE_CHOICE_KIDS',
  'GAP_FILL_IMAGE',
  'GAP_FILL_LETTER',
  'VOCABULARY',
  'PHONEME',
  'TRUE_FALSE_KIDS',
  'VOCABULARY_GAME',
  'MEMORY_GAME',
  'CONNECTING_DOTS',
  'SINGLE_CHOICE_GAME',
];

const UnitList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Group',
        path: 'group',
        width: '75px',
        sort: true,
      },
      {
        label: 'Order',
        path: 'order',
        width: '75px',
        sort: true,
      },
      {
        label: 'Name',
        path: 'name',
        sort: true,
      },
      {
        label: 'Difficulty',
        path: 'difficulty',
        width: '85px',
        render: (cell, row) => `${cell} - ${row.scoreToPass}`,
      },
      {
        label: 'Abilities',
        path: 'type.abilities',
        width: '70px',
        render: (cell, row) => (
          <div>
            {row.type.abilities.map((ability, index) => {
              if (row.type.abilities.length !== index + 1) {
                return `${ability.charAt(0)}, `;
              }
              return `${ability.charAt(0)}`;
            })}
          </div>
        ),
      },
      {
        label: 'Unit Type',
        path: 'type.name',
        width: '135px',
        sort: true,
      },
      {
        label: 'Status content',
        path: 'review.status',
        render: (cell, row) => row.review && (
          <StatusItem
            color={{
              PENDING: '#ef8c3b',
              REVIEWED: '#1188FF',
              DONE: '#009687',
              'NOT SENT TO REVIEW': '#758C98',
              'AWAITING FORMAT REVIEW': '#758C98',
            }[row.review.statusFormat !== 'APPROVED' && row.review.status !== 'NOT SENT TO REVIEW' ? 'AWAITING FORMAT REVIEW' : row.review.status]}
            text={row.review.statusFormat !== 'APPROVED' && row.review.status !== 'NOT SENT TO REVIEW' ? 'AWAITING FORMAT REVIEW' : row.review.status}
          />
        ),
      },
      {
        label: 'Status format',
        path: 'review.statusFormat',
        render: (cell, row) => row.review && (
          <StatusItem
            color={{
              PENDING: '#ef8c3b',
              PENDING_REVIEW: '#ef8c3b',
              APPROVED: '#009687',
              NOT_APPROVED: '#FF5233',
              DONE: '#009687',
            }[row.review.statusFormat]}
            text={replace(row.review.statusFormat, '_', ' ')}
          />
        ),
      },
      {
        label: 'Status image',
        path: 'review.statusImage',
        render: (cell, row) => {
          if (row.review && row.type.name !== 'Review' && row.type.itemsType.find(itemType => typesWithImage.find(type => type === itemType.key))) {
            return (
              <StatusItem
                color={{
                  NOT_SEND_TO_REVIEW: '#758C98',
                  PENDING_REVIEW: '#ef8c3b',
                  APPROVED: '#009687',
                  NOT_APPROVED: '#FF5233',
                }[row.review.statusImage || 'NOT_SEND_TO_REVIEW']}
                text={replace(row.review.statusImage || 'NOT_SEND_TO_REVIEW', '_', ' ')}
              />
            );
          }
          return row.review ? 'N/A' : '';
        },
      },
      {
        label: 'Items count',
        path: 'itemsCount',
        width: '105px',
      },
      {
        label: 'Unit time',
        path: 'time',
        width: '80px',
        render: (cell, row) => formatTimeFromSeconds(row.time),
      },
      {
        label: 'Actions',
        path: 'action',
        width: props.allowReorder ? '280px' : '175px',
        render: (cell, row, index) => (
          <div>
            {(row.createdBy === localStorage.id || localStorage.role === Roles.ADMIN) && (
              <Button
                icon="delete"
                onClick={() => props.onDelete(row)}
              />
            )}
            {' '}
            {(row.createdBy === localStorage.id || [Roles.ADMIN, Roles.SUPPORT].some(r => r === localStorage.role)) && (
              <Button
                icon="edit"
                onClick={() => browserHistory.push(`/modules/${row.module}/units/${row.id}`)}
              />
            )}
            {' '}
            {props.allowReorder && (
              <Button
                label="+1"
                onClick={() => props.onAutoReorder(index, 'ADD_LINE')}
              />
            )}
            {' '}
            {props.allowReorder && (
              <Button
                label="-1"
                onClick={() => props.onAutoReorder(index, 'REMOVE_LINE')}
              />
            )}
            {' '}
            {[Roles.ADMIN, Roles.SUPPORT, Roles.CONTENT_ADMIN, Roles.IMAGE_ADMIN].some(r => r === localStorage.role) && (
              <form
                action={`${process.env.REACT_APP_STUDENT_API_URL}/public/tasting`}
                target="_blank"
                method="post"
                style={{ display: 'inline-block' }}
              >
                <input type="hidden" name="unit" value={row.id} />
                <input type="hidden" name="type" value={props.academicPlan} />
                <input type="hidden" name="locale" value="pt-br" />
                <Button
                  icon="select"
                  buttonType="submit"
                />
              </form>
            )}
            {' '}
            {[Roles.ADMIN, Roles.SUPPORT, Roles.CONTENT_ADMIN].some(r => r === localStorage.role) && (
              <Button
                icon="cloud-upload"
                buttonType="button"
                onClick={() => props.onCopyToProduction(row.id)}
              />
            )}
          </div>
        ),
      },
    ]}
    rows={props.units}
    selectable
    onSelect={(row) => {
      if (row.type.name.toLowerCase() === 'review') {
        browserHistory.push(`/modules/${row.module}/units/${row.id}/review-items`);
      } else {
        browserHistory.push(`/modules/${row.module}/units/${row.id}/items`);
      }
    }}
  />
);

UnitList.propTypes = {
  units: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  academicPlan: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  allowReorder: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCopyToProduction: PropTypes.func.isRequired,
  onAutoReorder: PropTypes.func.isRequired,
};

export default UnitList;
