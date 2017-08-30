import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';
import Async from '../../../core/layout/Async';
import Table from '../../../core/form/Table';
import IconButton from '../../../core/form/IconButton';
import ItemFormContainer from '../../item/components/ItemFormContainer';
import ReviewFormContainer from './ReviewFormContainer';
import Separator from '../../../core/layout/Separator';

const PlacementTestItemList = props => (
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
          label: 'Text',
          path: 'item.text',
          width: '30%',
          rowColumnStyle: {
            textOverflow: 'none',
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 5,
            whiteSpace: 'normal',
            textAlign: 'justify',
            lineHeight: '18px',
          },
        },
        {
          label: 'Type',
          path: 'item.type.name',
          width: '15%',
        },
        {
          label: 'Time',
          path: 'item.time',
          width: '10%',
          render: (cell, row) => {
            return `${row.item.time < 60 ? '00:' : ''}${moment.duration(row.item.time, "seconds").format("mm:ss", {forceLength: true})}`
          },
        },
        {
          label: 'Status',
          path: 'reviews',
          width: '10%',
          render: (cell, row) => {
            return row.grammarPlacementTestLevel.reviews.find(review => review.forItem === row.item.id) && row.grammarPlacementTestLevel.reviews.find(review => review.forItem === row.item.id).status
          },
        },
        {
          label: 'Actions',
          path: 'action',
          width: '60',
          render: (cell, row) => {
            return (
              <IconButton
                icon="fa-trash"
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
        const review = row.grammarPlacementTestLevel.reviews.find(review => review.forItem === row.item.id) || { forItem: row.item.id };
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
  </Async>
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
