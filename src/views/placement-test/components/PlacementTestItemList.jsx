import React from 'react';
import PropTypes from 'prop-types';
import { formatTimeFromSeconds } from '../../../core/util';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';
import ItemFormContainer from '../../item/components/ItemFormContainer';
import ReviewFormContainer from './ReviewFormContainer';
import Separator from '../../../core/layout/Separator';

const PlacementTestItemList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Text',
        path: 'item.text',
        sort: true,
        defaultSortOrder: 'ascend',
      },
      {
        label: 'Type',
        path: 'item.type.name',
        width: '150px',
      },
      {
        label: 'Time',
        path: 'item.time',
        width: '105px',
        render: (cell, row) => formatTimeFromSeconds(row.item.time),
      },
      {
        label: 'Status',
        path: 'reviews',
        width: '105px',
        render: (cell, row) => {
          return row.grammarPlacementTestLevel.reviews.find(review => review.forItem === row.item.id) && row.grammarPlacementTestLevel.reviews.find(review => review.forItem === row.item.id).status
        },
      },
      {
        label: 'Actions',
        path: 'action',
        width: '70px',
        render: (cell, row) => {
          return (
            <Button
              icon="delete"
              onClick={() => props.onDelete(row)}
            />
          );
        },
      },
    ]}
    idColumn="item.id"
    rows={props.items}
    expandable
    expandableComponent={(row) => {
      const review = row.grammarPlacementTestLevel.reviews.find(r => r.forItem === row.item.id) || { forItem: row.item.id };
      return (
        <div>
          {(
            localStorage.role === 'ADMIN' ||
            (localStorage.role === 'CONTENT_ADMIN' && review.status && review.status !== 'APPROVED')
          ) && (
            <div>
              <ReviewFormContainer
                review={review}
                placementTestId={row.grammarPlacementTestLevel.id}
              />
              <Separator size="md" />
            </div>
          )}
          <ItemFormContainer
            itemId={row.item.id}
            itemsTypeUrl="/item-types?query[allowedForPlacementTest]=true"
            endpointUrl={`/grammar-placement-test-levels/${row.grammarPlacementTestLevel.id}/items`}
            order={null}
            onSaveSuccess={props.onSaveSuccess}
            isTestItem
          />
        </div>
      )
    }}
  />
);

PlacementTestItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    grammarPlacementTestLevel: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    item: PropTypes.shape({
      text: PropTypes.string,
      translation: PropTypes.string,
      grammar: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    }),
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PlacementTestItemList;
