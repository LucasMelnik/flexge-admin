import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudentListService from '../services/StudentListService';
import StudentListFilter from './StudentListFilter';

const StudentListFilterContainer = props => (
  <StudentListFilter
    hasSchoolClass={props.hasSchoolClass}
    values={StudentListService.form.getValues()}
    onChange={StudentListService.form.setValue}
    onSearch={StudentListService.load}
    errors={StudentListService.form.errors}
    fetching={StudentListService.fetch.fetching}
  />
);

StudentListFilterContainer.propTypes = {
  hasSchoolClass: PropTypes.bool,
};

StudentListFilterContainer.defaultProps = {
  hasSchoolClass: true,
};

export default observer(StudentListFilterContainer);
