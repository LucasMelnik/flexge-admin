import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../../core/form/Button';
import Column from '../../../core/layout/Column';
import Row from '../../../core/layout/Row';
import FetchSelect from '../../../core/form/FetchSelect';

const PlacementTestListFilter = props => (
  <div>
    <Row>
      <Column size={2}>
        <FetchSelect
          url="placement-test-levels?query[level][$ne]=5.5"
          fullWidth
          disabled={props.fetching}
          label="Level"
          value={get(props.values, 'placementTestLevel', '')}
          onChange={value => props.onChange('placementTestLevel', value)}
          resultTransformer={{
            text: 'level',
            value: 'id',
          }}
        />
      </Column>
      <Column size={6}>
        <FetchSelect
          url="grammars"
          fullWidth
          disabled={props.fetching}
          label="Grammar"
          value={get(props.values, 'grammar', '')}
          onChange={grammar => props.onChange('grammar', grammar)}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={2}>
        <div style={{ height: 33 }} />
        <Button
          label="Search"
          icon="search"
          onClick={props.onSearch}
        />
      </Column>
    </Row>
  </div>
);

PlacementTestListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  fetching: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

PlacementTestListFilter.defaultProps = {
  fetching: false,
};

export default PlacementTestListFilter;
