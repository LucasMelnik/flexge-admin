import React from 'react';
import PropTypes from 'prop-types';
import { formatTimeFromSeconds } from '../../../core/util';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';
import ItemFormContainer from '../../item/components/ItemFormContainer';
import ReviewFormContainer from './ReviewFormContainer';
import Separator from '../../../core/layout/Separator';

const CertificationTestRegisterItemList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Text',
        path: 'item.text',
        sort: true,
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
          return row.certificationTestCourseAbility.reviews.find(review => review.forItem === row.item.id) && row.certificationTestCourseAbility.reviews.find(review => review.forItem === row.item.id).status
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
      const review = row.certificationTestCourseAbility.reviews.find(r => r.forItem === row.item.id) || { forItem: row.item.id };
      return (
        <div>
          {(
            localStorage.role === 'ADMIN' ||
            (localStorage.role === 'CONTENT_ADMIN' && review.status && review.status !== 'APPROVED')
          ) && (
            <div>
              <ReviewFormContainer
                review={review}
                certificationTestId={row.certificationTestCourseAbility.id}
              />
              <Separator size="md" />
            </div>
          )}
          <ItemFormContainer
            itemId={row.item.id}
            itemsTypeUrl={`/item-types?query[allowedForCertificationTest]=${row.certificationTestCourseAbility.ability}`}
            endpointUrl={`/certification-test-course-ability/${row.certificationTestCourseAbility.id}/items`}
            order={null}
            onSaveSuccess={props.onSaveSuccess}
            isTestItem
          />
        </div>
      )
    }}
  />
);

CertificationTestRegisterItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    certificationTestCourseAbility: PropTypes.shape({
      id: PropTypes.string.isRequired,
      ability: PropTypes.string.isRequired,
      reviews: PropTypes.arrayOf(PropTypes.shape({})),
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
  onSaveSuccess: PropTypes.func.isRequired,
};

export default CertificationTestRegisterItemList;
