import React from 'react';
import PropTypes from 'prop-types';
import EditableFormTable from '../../../core/form/EditableTable';

const LocalizationList = props => (
  <EditableFormTable
    fetching={props.fetching}
    columns={[
      {
        label: 'Key',
        path: 'key',
        sort: true,
        defaultSortOrder: 'ascend',
      },
      {
        label: 'Portuguese',
        path: 'portuguese',
        editable: true,
      },
      {
        label: 'English',
        path: 'english',
        editable: true,
      },
      {
        label: 'Spanish',
        path: 'spanish',
        editable: true,
      },
    ]}
    rows={props.items}
    onDelete={props.onDelete}
    onSave={props.onSave}
    pagination={{ pageSize: 50 }}
  />
);

LocalizationList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default LocalizationList;
