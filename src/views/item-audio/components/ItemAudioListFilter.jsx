import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import ColumnSeparator from '../../../core/layout/ColumnSeparator';
import FetchSelect from '../../../core/form/FetchSelect';
import Select from '../../../core/form/Select';
import TextInput from '../../../core/form/TextInput';

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
      <FetchSelect
        label="Filter by Character"
        url="characters"
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
      <Select
        label="Filter by status"
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
        width: 220,
      }}
    >
      <Select
        label="Filter by Audio"
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
            value: 'WITH_AUDIOS',
          },
          {
            label: 'Without audios',
            value: 'WITHOUT_AUDIOS',
          },
        ]}
      />
    </div>
    <ColumnSeparator />
    <div
      style={{
        width: 300,
      }}
    >
      <TextInput
        label="Filter by item text"
        placeholder="Filter by item text"
        value={get(props.values, 'text', '')}
        onChange={value => props.onChange('text', value)}
        onBlur={props.onSearch}
        disabled={props.fetching}
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
