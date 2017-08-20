import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';
import FetchSelect from '../../../core/form/FetchSelect';
import Button from '../../../core/form/Button';
import PermissionValidator from '../../../../core/content/PermissionValidator';

const StudentListFilter = props => (
  <div>
    <div
      style={{
        display: 'inline-block',
        minWidth: 250,
      }}
    >
      <TextInput
        label="Search for students"
        value={props.values.filter}
        onChange={value => props.onChange('filter', value)}
        disabled={props.fetching}
      />
    </div>

    <div
      style={{
        display: 'inline-block',
        verticalAlign: 'top',
        marginLeft: 20,
      }}
    >
      {!props.companyId && (
        <PermissionValidator allowedFor={['ADMIN']}>
          <FetchSelect
            url="/companies"
            disabled={props.fetching}
            label="Company"
            fullWidth={false}
            onChange={value => props.onChange('company', value)}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
            value={get(props.values, 'company')}
          />
        </PermissionValidator>
      )}
    </div>
    <div
      style={{
        display: 'inline-block',
        marginLeft: 20,
      }}
    >
      <Button
        label="Search"
        icon="fa-search"
        default
        onClick={props.onSearch}
      />
    </div>
  </div>
);

StudentListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  fetching: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  companyId: PropTypes.string,
};

StudentListFilter.defaultProps = {
  fetching: false,
  companyId: null,
};


export default StudentListFilter;
