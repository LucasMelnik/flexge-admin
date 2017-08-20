import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudentListService from '../services/StudentListService';
import StudentListFilter from './StudentListFilter';

const StudentListFilterContainer = props => (
  <StudentListFilter
    companyId={props.companyId}
    values={StudentListService.form.getValues()}
    onChange={StudentListService.form.setValue}
    fetching={StudentListService.fetch.fetching}
    onSearch={StudentListService.loadAllStudents}
  />
);

StudentListFilterContainer.propTypes = {
  companyId: PropTypes.string,
};

StudentListFilterContainer.defaultProps = {
  companyId: null,
};

export default observer(StudentListFilterContainer);
