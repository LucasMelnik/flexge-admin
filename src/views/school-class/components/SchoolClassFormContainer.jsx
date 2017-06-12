import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import SchoolClassForm from './SchoolClassForm';
import SchoolClassFormService from '../services/SchoolClassFormService';
import StudentListService from '../services/StudentListService';

class SchoolClassFormContainer extends Component {

  componentWillMount() {
    StudentListService.load();
  }

  render() {
    return (
      <SchoolClassForm
        onSubmit={SchoolClassFormService.handleSubmit}
        onChange={SchoolClassFormService.form.setValue}
        onReset={SchoolClassFormService.form.reset}
        values={SchoolClassFormService.form.getValues()}
        errors={SchoolClassFormService.form.errors}
        submitting={SchoolClassFormService.submit.fetching}
        error={SchoolClassFormService.submit.error}
        isDirty={SchoolClassFormService.form.isDirty}
        students={toJS(StudentListService.students)}
        onAddStudent={SchoolClassFormService.handleAddStudent}
        onRemoveStudent={SchoolClassFormService.handleRemoveStudent}
      />
    );
  }
}

export default observer(SchoolClassFormContainer);
