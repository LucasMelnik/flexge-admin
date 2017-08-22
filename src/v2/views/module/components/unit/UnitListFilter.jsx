import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../../core/form/TextInput';
import Button from '../../../../core/form/Button';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import Separator from '../../../../core/layout/Separator';

const UnitListFilter = props => (
  <Row>
    <Column lgSize={10} mdSize={10} smSize={10}>
      <TextInput
        label="Search units"
        value={props.values.filter}
        onChange={value => props.onChange('filter', value)}
        disabled={props.fetching}
      />
    </Column>
    <Column lgSize={2} mdSize={2} smSize={2}>
      <Separator size="md" />
      <Button
        label="Search"
        icon="fa-search"
        type="primary"
        onClick={props.onSearch}
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
