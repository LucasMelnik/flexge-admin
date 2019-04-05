import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import FetchSelect from '../../../../core/form/FetchSelect';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import Button from '../../../../core/form/Button';

const StudentCloseToFinishCourseListFilter = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      {(localStorage.role === 'ADMIN' || localStorage.role === 'DISTRIBUTOR_MANAGER' || localStorage.role === 'COMPANY_MANAGER') && (
        <Column size={3}>
          <FetchSelect
            url="/schools"
            label="School"
            disabled={props.fetching}
            value={get(props.values, 'school', '')}
            onChange={school => props.onChange('school', school)}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      )}
      {get(props.values, 'school', undefined) && (
        <Column size={4}>
          <FetchSelect
            url={`/schools/${props.values.school}/classes`}
            label="Class rooms"
            disabled={props.fetching}
            value={get(props.values, 'schoolClass', '')}
            onChange={school => props.onChange('schoolClass', school)}
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
          disabled={props.fetching}
          icon="search"
          buttonType="submit"
          label="Search"
        />
      </Column>
    </Row>
  </form>
);

StudentCloseToFinishCourseListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
};

StudentCloseToFinishCourseListFilter.defaultProps = {
  fetching: false,
};

export default StudentCloseToFinishCourseListFilter;
