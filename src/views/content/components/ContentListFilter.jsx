import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../../core/form/Button';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import AutoComplete from '../../../core/form/AutoComplete';

const ContentListFilter = props => (
  <Row>
    <Column size={4}>
      <AutoComplete
        disabled={props.fetching}
        label="Module"
        value={get(props.values, 'module', get(props.values, 'moduleFilter'))}
        errorText={get(props.errors, 'module', null)}
        labelPath="name"
        onChange={(value) => {
          console.log(value)
          props.onChange('moduleFilter', value);
          props.onChange('module', undefined);
          props.onModuleSearch();
        }}
        onSelect={value => props.onChange('module', value)}
        dataSource={props.modules}
        fetching={props.fetchingModules}
        placeholder="Type to find a module"
      />
    </Column>
    <Column size={4}>
      <AutoComplete
        disabled={props.fetching}
        label="Unit"
        errorText={get(props.errors, 'unit', null)}
        value={get(props.values, 'unit', get(props.values, 'unitFilter'))}
        labelPath="name"
        onChange={(value) => {
          props.onChange('unitFilter', value);
          props.onChange('unit', undefined);
          props.onUnitSearch();
        }}
        onSelect={value => props.onChange('unit', value)}
        dataSource={props.units}
        fetching={props.fetchingUnits}
        placeholder="Type to find a unit"
      />
    </Column>
    <Column size={2}>
      <div style={{ height: 32 }} />
      <Button
        label="Search"
        icon="search"
        onClick={props.onSearch}
      />
    </Column>
  </Row>
);

ContentListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  fetchingModules: PropTypes.bool.isRequired,
  fetchingUnits: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  onModuleSearch: PropTypes.func.isRequired,
  modules: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onUnitSearch: PropTypes.func.isRequired,
  units: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ContentListFilter;
