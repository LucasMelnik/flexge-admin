import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import FetchSelect from '../../../../core/form/FetchSelect';
import Button from '../../../../core/form/Button';

const EvaluationTemplateLinkListFilter = props => (
  <Row>
    {(localStorage.role === 'ADMIN' || localStorage.role === 'DISTRIBUTOR_MANAGER' || localStorage.role === 'COMPANY_MANAGER') && (
      <Column size={3}>
        <FetchSelect
          showSearch
          isPaginated
          required
          label="Filter by school"
          value={get(props.values, 'school', '')}
          onChange={value => props.onChange('school', value)}
          url={`schools${localStorage.role === 'COMPANY_MANAGER' ? `?company=${localStorage.getItem('company')}` : ''}`}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
    )}
    <Column size={2}>
      <div style={{ height: 42 }} />
      <Button
        label="Search Classrooms"
        icon="search"
        onClick={props.onSearch}
      />
    </Column>
  </Row>
);

EvaluationTemplateLinkListFilter.propTypes = {
  values: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

EvaluationTemplateLinkListFilter.defaultProps = {
  values: {},
};

export default EvaluationTemplateLinkListFilter;
