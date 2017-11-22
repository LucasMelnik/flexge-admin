import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../../../core/form/Button';
import FetchSelect from '../../../../core/form/FetchSelect';
import Column from '../../../../core/layout/Column';
import Row from '../../../../core/layout/Row';

const UnitImageListFilter = props => (
  <Row>
    <Column size={4}>
      <FetchSelect
        url="/users?query[role]=IMAGE_ADMIN"
        label="Unit Image Owner"
        disabled={props.fetching}
        value={get(props.values, 'imageOwner')}
        onChange={value => props.onChange('imageOwner', value)}
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
);

UnitImageListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func,
};

UnitImageListFilter.defaultProps = {
  fetching: false,
  onSearch: null,
};

export default UnitImageListFilter;
