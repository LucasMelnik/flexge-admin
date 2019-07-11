import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '../../../../core/layout/Dialog';
import AudioPreview from '../../../../core/layout/AudioPreview';
import Table from '../../../../core/form/Table';
import Button from '../../../../core/form/Button';
import Tag from '../../../../core/layout/Tag';

const StudentDetailExecutionResultDialog = props => (
  <Dialog
    width="90%"
    isOpen={props.isOpen}
    title="Execution Details"
    onCancel={props.onClose}
    actions={[
      <Button
        icon="close-circle"
        label="Close"
        onClick={props.onClose}
      />,
    ]}
  >
    <Table
      rows={props.items}
      columns={[
        {
          label: 'Correct',
          path: 'correct',
          width: '70px',
          align: 'center',
          render: value => <Tag color={value ? 'green' : 'red'}>{value ? 'Yes' : 'No'}</Tag>,
        },
        {
          label: 'Question/Subject',
          path: 'item.text',
        },
        {
          label: 'Attempts',
          path: 'attempts.length',
        },
        {
          label: 'Last Answer/Score',
          path: 'attempts',
          render: attempts => attempts && attempts.length && attempts[attempts.length - 1].answer,
        },
        {
          label: 'Last Record',
          path: 'lastRecord',
          width: '130px',
          align: 'center',
          render: value => value && (
            <AudioPreview src={value} />
          ),
        },
      ]}
    />
  </Dialog>
);

StudentDetailExecutionResultDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default StudentDetailExecutionResultDialog;
