import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../../core/form/TextInput';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import Select from '../../../../core/form/Select';

const UnitListFilter = props => (
  <Row>
    <Column size={8}>
      <TextInput
        label="Type to filter the units by name"
        value={props.values.filter}
        onChange={value => props.onChange('filter', value)}
        disabled={props.fetching}
      />
    </Column>
    <Column size={2}>
      <Select
        label="Only with images"
        value={props.values.onlyWithImages}
        onChange={value => props.onChange('onlyWithImages', value)}
        disabled={props.fetching}
        options={[
          {
            label: 'Yes',
            value: 'true',
          },
          {
            label: 'No',
            value: 'false',
          },
        ]}
      />
    </Column>
  </Row>
);

UnitListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  fetching: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

UnitListFilter.defaultProps = {
  fetching: false,
};


export default UnitListFilter;
