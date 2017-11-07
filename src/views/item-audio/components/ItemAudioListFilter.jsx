import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Select from '../../../core-ant/Select';
import ColumnSeparator from '../../../core/layout/ColumnSeparator';
import FetchSelect from '../../../core-ant/FetchSelect';

const ItemAudioListFilter = props => (
  <div
    style={{
      display: 'flex',
    }}
  >
    <div
      style={{
        width: 250,
      }}
    >
      Filter by Character
      <FetchSelect
        url="/characters"
        disabled={props.fetching}
        value={get(props.values, 'character')}
        onChange={(value) => {
          props.onChange('character', value);
          props.onSearch();
        }}
        resultTransformer={{
          text: 'name',
          value: 'id',
        }}
      />
    </div>
    <ColumnSeparator />
    <div
      style={{
        width: 200,
      }}
    >
      Filter by status
      <Select
        placeholder="Filter by status"
        value={get(props.values, 'status', '')}
        onChange={(value) => {
          props.onChange('status', value);
          props.onSearch();
        }}
        disabled={props.fetching}
        options={[
          {
            label: 'Approved',
            value: 'APPROVED',
          },
          {
            label: 'Not Approved',
            value: 'NOT_APPROVED',
          },
          {
            label: 'Pending',
            value: 'PENDING',
          },
        ]}
      />
    </div>
    <ColumnSeparator />
    <div
      style={{
        width: 110,
      }}
    >
      Filter by Audio
      <Select
        placeholder="Filter by audio"
        value={get(props.values, 'hasAudio', '')}
        onChange={(value) => {
          props.onChange('hasAudio', value);
          props.onSearch();
        }}
        disabled={props.fetching}
        options={[
          {
            label: 'With audios',
            value: '$ne',
          },
          {
            label: 'Without audios',
            value: '$eq',
          },
        ]}
      />
    </div>
  </div>
);

ItemAudioListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
};

ItemAudioListFilter.defaultProps = {
  fetching: false,
};

export default ItemAudioListFilter;
