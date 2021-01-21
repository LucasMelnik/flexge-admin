import React from 'react';
import PropTypes from 'prop-types';
import FetchSelect from '../../../core/form/FetchSelect';
import get from 'lodash/get';
import Column from '../../../core/layout/Column';
import Row from '../../../core/layout/Row';
import { Roles } from '../../../core/util';
import PermissionValidator from '../../../core/layout/PermissionValidator';
import Button from '../../../core/form/Button';

const ContentVideoListFilter = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={2.5}>
        <FetchSelect
          showSearch
          url="/courses"
          disabled={props.fetching}
          label="Course"
          value={get(props.values, 'course')}
          onChange={value => props.onChange('course', value)}
          resultFilter={c => c.name.toLowerCase() !== 'adventures' && c.name.toLowerCase() !== 'discovery'}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={4}>
        <FetchSelect
          showSearch
          url="approved-modules"
          label="Module"
          params={{course: props.values.course}}
          disabled={props.fetching || !props.values.course}
          value={get(props.values, 'module', '')}
          onChange={module => props.onChange('module', module)}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <PermissionValidator allowedFor={[Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER]}>
        <Column size={3}>
          <FetchSelect
            showSearch
            url="/companies"
            isPaginated
            disabled={props.fetching}
            label="Company"
            value={get(props.values, 'company', [])}
            onChange={(value) => props.onChange('company', value)}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      </PermissionValidator>
      <Column size={1.5}>
        <div style={{height: 42}}/>
        <Button
          icon="search"
          label="Search"
          buttonType="submit"
          disabled={props.fetching}
        />
      </Column>
    </Row>
  </form>
);

ContentVideoListFilter.propTypes = {
  onSubmit: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
};

ContentVideoListFilter.defaultProps = {
  values: {},
  fetching: false,
  onSubmit: () => alert('submitted'),
};

export default ContentVideoListFilter;
