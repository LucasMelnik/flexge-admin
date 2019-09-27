import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Dialog from '../../../core/layout/Dialog';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import FormButtons from '../../../core/form/FormButtons';
import TextEditor from '../../../core/form/TextEditor';
import Alert from '../../../core/layout/Alert';
import Separator from '../../../core/layout/Separator';

const SuspectUsageAlertFormDialog = props => (
  <Dialog
    title="Review Alert"
    isOpen={props.isOpen}
    onCancel={props.onClose}
    actions={[]}
  >
    <Alert
      title="What will change?"
      description="After you review and confirm the system will update the student execution, the studied time will change to 30 seconds and the counts to 1 and the study quality will be recalculated."
    />
    <Separator size="xs" />
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <Row>
        <Column size={12}>
          <TextEditor
            value={get(props.values, 'reviewNotes', '')}
            onChange={value => props.onChange('reviewNotes', value)}
            placeholder="Leave your comments here"
            style={{
              height: 180,
              paddingBottom: 90,
            }}
          />
        </Column>
      </Row>
      <FormButtons
        confirmLabel="Save"
        isDisabled={props.submitting || !props.isDirty()}
        isSubmitting={props.submitting}
        onReset={props.onReset}
      />
    </form>
  </Dialog>
);

SuspectUsageAlertFormDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isDirty: PropTypes.func.isRequired,
  values: PropTypes.shape({}).isRequired,
  submitting: PropTypes.bool.isRequired,
  errors: PropTypes.shape({}),
};

SuspectUsageAlertFormDialog.defaultProps = {
  errors: {},
};

export default SuspectUsageAlertFormDialog;
