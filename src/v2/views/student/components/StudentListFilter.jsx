import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';

const StudentListFilter = props => (
  <div>
    <div
      style={{
        display: 'inline-block',
        minWidth: 250,
      }}
    >
      <TextInput
        label="Search for students"
        value={props.values.filter}
        onChange={value => props.onChange('filter', value)}
        disabled={props.fetching}
      />
    </div>

    <div
      style={{
        display: 'inline-block',
        marginLeft: 20,
      }}
    >
      <Button
        label="Search"
        icon="fa-search"
        default
        onClick={props.onSearch}
      />
    </div>
  </div>
);

StudentListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  fetching: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

StudentListFilter.defaultProps = {
  fetching: false,
};


export default StudentListFilter;
