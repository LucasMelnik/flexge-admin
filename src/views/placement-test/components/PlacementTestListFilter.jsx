import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../../core/form/Button';
import Column from '../../../core/layout/Column';
import Row from '../../../core/layout/Row';
import FetchSelect from '../../../core/form/FetchSelect';
import Separator from '../../../core/layout/Separator';

const PlacementTestListFilter = props => (
  <div>
    <Row>
      <Column lgSize={2}>
        <FetchSelect
          url="grammars"
          fullWidth
          disabled={props.fetching}
          label="Level"
          value={get(props.values, 'level', '')}
          onChange={value => props.onChange('level', value)}
        />
      </Column>
      <Column lgSize={6}>
        <FetchSelect
          url="grammars"
          fullWidth
          disabled={props.fetching}
          label="Grammar"
          maxHeight={350}
          value={get(props.values, 'grammar.id', '')}
          onChange={grammar => props.onChange('grammar.id', grammar)}
        />
      </Column>
      <Column lgSize={2}>
        <Separator size="md" />
        <Button
          label="Search"
          icon="search"
          priimary
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
