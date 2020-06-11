import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import FetchSelect from '../../../../core/form/FetchSelect';
import Button from '../../../../core/form/Button';
import { Roles } from '../../../../core/util';
import PermissionValidator from '../../../../core/layout/PermissionValidator';

const EvaluationTemplateLinkListFilter = props => (
  <Row>
    <PermissionValidator allowedFor={[Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER]}>
      <Column size={3}>
        <FetchSelect
          showSearch
          isPaginated
          required
          label="Filter by school"
          value={get(props.values, 'school', '')}
          onChange={value => props.onChange('school', value)}
          url={`schools${localStorage.role === Roles.COMPANY_MANAGER ? `?company=${localStorage.getItem('company')}` : ''}`}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
    </PermissionValidator>
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
