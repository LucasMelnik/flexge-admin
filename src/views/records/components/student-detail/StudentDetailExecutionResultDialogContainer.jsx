import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentDetailExecutionResultDialog from './StudentDetailExecutionResultDialog';
import StudentRecordDetailExecutionResultDialogService from '../../services/StudentRecordDetailExecutionResultDialogService';

const StudentDetailExecutionResultDialogContainer = () => (
  <StudentDetailExecutionResultDialog
    isOpen={StudentRecordDetailExecutionResultDialogService.show}
    items={toJS(StudentRecordDetailExecutionResultDialogService.items)}
    onClose={StudentRecordDetailExecutionResultDialogService.handleClose}
  />
);

export default observer(StudentDetailExecutionResultDialogContainer);
