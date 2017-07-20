import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import FetchSelect from '../../../core/form/FetchSelect';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';
import Separator from '../../../core/layout/Separator';

const ModuleItemListFilter = props => (
  <Row>
    <Column lgSize={4}>
      <TextInput
        fullWidth
        label="Search by text"
        value={props.values.text}
        onChange={value => props.onChange('text', value)}
        disabled={props.fetching}
      />
    </Column>
    <Column lgSize={3}>
      <FetchSelect
        url={props.itemTypesUrl}
        fullWidth
        disabled={props.fetching}
        label="Type"
        maxHeight={350}
        value={get(props.values, 'type.id', '')}
        onChange={type => props.onChange('type.id', type)}
      />
    </Column>
    <Column lgSize={3}>
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
);

ModuleItemListFilter.propTypes = {
  itemTypesUrl: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  fetching: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

ModuleItemListFilter.defaultProps = {
  fetching: false,
};


export default ModuleItemListFilter;
