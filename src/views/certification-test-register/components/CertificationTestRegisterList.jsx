import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';
import Tag from '../../../core/layout/Tag';

const CertificationTestRegisterList = props => (
  <div>
    <Table
      showTableCount={false}
      fetching={props.fetching}
      columns={[
        {
          label: 'Course',
          path: 'course.name',
          width: '80px',
          sort: true,
        },
        {
          label: 'Ability',
          path: 'ability',
          width: '95px',
          sort: true,
        },
        {
          label: 'Order',
          path: 'order',
          width: '85px',
          sort: true,
        },
        {
          label: 'Grammar',
          path: 'grammar.name',
        },
        {
          label: 'Status',
          path: 'reviews',
          width: '170px',
          align: 'center',
          render: (cell, row) => {
            if (row.children) {
              return '';
            }
            const itemsReview = (row.reviews || []).filter(review => row.items.some(item => review.forItem === item));
            return (
              <span>
                <Tag
                  color={itemsReview.filter(x => x.status === 'APPROVED').length ? 'green' : null}>A: {itemsReview.filter(x => x.status === 'APPROVED').length}</Tag>
                <Tag
                  color={itemsReview.filter(x => x.status === 'PENDING').length ? 'orange' : null}>P: {itemsReview.filter(x => x.status === 'PENDING').length}</Tag>
                <Tag
                  color={itemsReview.filter(x => x.status === 'NOT_APPROVED').length ? 'red' : null}>R: {itemsReview.filter(x => x.status === 'NOT_APPROVED').length}</Tag>
              </span>
            );
          },
        },
        {
          label: 'Items Count',
          path: 'items.length',
          width: '115px',
        },
        {
          label: 'Items to Show',
          path: 'itemsToShow',
          width: '115px',
          render: cell => cell || 0,
        },
        {
          label: 'Extra Items',
          width: '105px',
          render: (cell, row) => (row.items.length - row.itemsToShow) || 0,
        },
        {
          label: 'Actions',
          path: 'action',
          width: '105px',
          render: (cell, row) => {
            return row.children ? (
              <form
                action={`${process.env.REACT_APP_STUDENT_API_URL}/public/tasting`}
                target="_blank"
                method="post"
                style={{display: 'inline-block'}}
              >
                <input type="hidden" name="function" value="certification"/>
                <input type="hidden" name="locale" value="pt-br"/>
                <input type="hidden" name="course" value={row.course.id}/>
                <input type="hidden" name="ability" value={row.ability}/>
                <Button
                  icon="select"
                  buttonType="submit"
                />
              </form>
            ) : (
              <div>
                <Button
                  icon="delete"
                  onClick={() => props.onDelete(row)}
                />
                {' '}
                <Button
                  icon="edit"
                  onClick={() => browserHistory.push(`/certification-test-register/${row.id}`)}
                />
              </div>
            );
          },
        },
      ]}
      rows={props.registers}
    />
    <small>{props.registers.reduce((acc, test) => acc + (test.children.length || 0), 0)} registers found.</small>
    <br/>
    <small>{props.registers.reduce((acc, test) => acc + (test.items.length || 0), 0)} item{props.registers.reduce((acc, test) => acc + (test.items.length || 0), 0) > 1 && 's'} found.</small>
    <br/>
    <small>{props.registers.reduce((acc, test) => acc + (test.itemsToShow || 0), 0)} item{props.registers.reduce((acc, test) => acc + (test.itemsToShow || 0), 0) > 1 && 's'} to
      show.</small>
  </div>
);

CertificationTestRegisterList.propTypes = {
  registers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    itemsToShow: PropTypes.number.isRequired,
    course: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.number.isRequired,
    }).isRequired,
    grammar: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CertificationTestRegisterList;
