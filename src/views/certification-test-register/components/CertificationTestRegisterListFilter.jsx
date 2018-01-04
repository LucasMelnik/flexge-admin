import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../../core/form/Button';
import Column from '../../../core/layout/Column';
import Row from '../../../core/layout/Row';
import FetchSelect from '../../../core/form/FetchSelect';

const CertificationTestRegisterListFilter = props => (
  <div>
    <Row>
      <Column size={2}>
        <FetchSelect
          url="courses"
          fullWidth
          disabled={props.fetching}
          label="Course"
          value={get(props.values, 'course', '')}
          onChange={value => props.onChange('course', value)}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
          resultFilter={course => course.name.indexOf('+') < 0 && course.name.toLowerCase().indexOf('pre') < 0}
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

CertificationTestRegisterListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  fetching: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

CertificationTestRegisterListFilter.defaultProps = {
  fetching: false,
};

export default CertificationTestRegisterListFilter;
