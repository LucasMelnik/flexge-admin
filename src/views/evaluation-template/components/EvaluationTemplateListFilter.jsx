import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import get from 'lodash/get';
import range from 'lodash/range';
import toInteger from 'lodash/toInteger';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Select from '../../../core/form/Select';
import FetchSelect from '../../../core/form/FetchSelect';
import Button from '../../../core/form/Button';
import { Roles } from '../../../core/util';
import PermissionValidator from '../../../core/layout/PermissionValidator';

const EvaluationTemplateListFilter = props => (
  <Row>
    <PermissionValidator allowedFor={[Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER]}>
      <Column size={3}>
        <FetchSelect
          showSearch
          isPaginated
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
    <Column size={1}>
      <Select
        label="Filter by Year"
        value={get(props.values, 'year', '')}
        onChange={value => props.onChange('year', value)}
        options={range(2018, toInteger(moment().format('YYYY')) + 5).map(year => ({
          label: year.toString(),
          value: year,
        }))}
      />
    </Column>
    <Column size={2}>
      <div style={{ height: 42 }} />
      <Button
        label="Search"
        icon="search"
        onClick={props.onSearch}
      />
    </Column>
  </Row>
);

EvaluationTemplateListFilter.propTypes = {
  values: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

EvaluationTemplateListFilter.defaultProps = {
  values: {},
};

export default EvaluationTemplateListFilter;
