import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../../core/layout/Row';
import Column from '../../../../../core/layout/Column';
import FetchSelect from '../../../../../core/form/FetchSelect';
import TextInput from '../../../../../core/form/TextInput';
import Button from '../../../../../core/form/Button';
import Separator from '../../../../../core/layout/Separator';

const AllUnitItemListFilter = props => (
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
        url="item-types"
        fullWidth
        addEmptyOption
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
        addEmptyOption
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

AllUnitItemListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  fetching: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

AllUnitItemListFilter.defaultProps = {
  fetching: false,
};


export default AllUnitItemListFilter;
