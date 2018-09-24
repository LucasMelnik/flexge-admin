import React from 'react';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';
import { browserHistory } from 'react-router';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const ContentList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      ...[
        {
          label: 'Course',
          path: 'course',
          width: 80,
        },
        {
          label: 'Module',
          path: 'module',
          sort: true,
        },
        {
          label: 'Unit Group',
          path: 'group',
          sort: true,
          width: 110,
        },
        // {
        //   label: 'Unit Order',
        //   path: 'order',
        //   sort: true,
        //   width: 110,
        // },
        {
          label: 'Unit',
          path: 'name',
          sort: true,
        },
        {
          label: 'Type',
          path: 'type.name',
          sort: true,
        },
        {
          label: 'Abilities',
          path: 'type.abilities',
          width: 140,
          render: values => values.reduce((acc, value, index) => acc.concat(index ? ', ' : ' ').concat(upperFirst(value.toLowerCase())), ''),
        },
        {
          label: 'Grammar',
          path: 'grammars',
          width: 300,
          render: value => value.reduce((acc, val, index) => acc.concat(index ? ', ' : '').concat(val.name), ''),
        },
      ],
      ...(localStorage.role === 'ADMIN' || localStorage.role === 'CONTENT_ADMIN') && [
        {
          label: 'Actions',
          path: 'action',
          width: '80px',
          align: 'center',
          render: (cell, row) => (
            <Button
              icon="edit"
              onClick={() => browserHistory.push(`/modules/${row.moduleId}/units/${row.id}/items`)}
            />
          ),
        },
      ],
    ]}
    rows={props.modules}
    selectable
    onSelect={row => browserHistory.push(`/contents/${row.id}/details`)}
  />
);

ContentList.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    backgroundUrl: PropTypes.string,
    course: PropTypes.object.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default ContentList;
