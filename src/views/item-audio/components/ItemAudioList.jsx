import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../core-ant/Table';

const ItemAudioList = props => (
  <Table
    fetching={props.fetching}
    pagination={props.pagination}
    onChange={props.onChange}
    columns={[
      {
        label: 'Text',
        path: 'text',
        sort: true,
      },
      {
        label: 'Character',
        path: 'character.name',
        sort: true,
      },
      {
        label: 'Audio',
        path: 'audio',
      },
    ]}
    dataSource={props.items}
  />
);

ItemAudioList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    character: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  })).isRequired,
  pagination: PropTypes.shape({
    current: PropTypes.number,
    total: PropTypes.number,
    pageSize: PropTypes.number,
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ItemAudioList;
