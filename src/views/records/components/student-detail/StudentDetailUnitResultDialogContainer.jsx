import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentDetailUnitResultDialog from './StudentDetailUnitResultDialog';
import StudentRecordDetailUnitResultDialogService from '../../services/StudentRecordDetailUnitResultDialogService';

const StudentDetailUnitResultDialogContainer = () => (
  <StudentDetailUnitResultDialog
    isOpen={StudentRecordDetailUnitResultDialogService.show}
    items={toJS(StudentRecordDetailUnitResultDialogService.items)}
    onClose={StudentRecordDetailUnitResultDialogService.handleClose}
  />
);

export default observer(StudentDetailUnitResultDialogContainer);
