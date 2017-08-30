import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';
import FetchSelect from '../../../core/form/FetchSelect';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Separator from '../../../core/layout/Separator';

const ModuleListFilter = props => (
  <Row>
    <Column lgSize={6} mdSize={6} smSize={6}>
      <TextInput
        label="Search modules"
        value={props.values.filter}
        onChange={value => props.onChange('filter', value)}
        disabled={props.fetching}
      />
    </Column>
    <Column lgSize={4} mdSize={4} smSize={4}>
      <FetchSelect
        url="/courses"
        disabled={props.fetching}
        label="Course"
        value={get(props.values, 'course')}
        onChange={value => props.onChange('course', value)}
        resultTransformer={{
          text: 'name',
          value: 'id',
        }}
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

ModuleListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func,
};

ModuleListFilter.defaultProps = {
  fetching: false,
  onSearch: null,
};

export default ModuleListFilter;
