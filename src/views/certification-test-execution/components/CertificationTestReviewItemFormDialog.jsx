import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Dialog from '../../../core/layout/Dialog';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import FormButtons from '../../../core/form/FormButtons';
import TextEditor from '../../../core/form/TextEditor';
import TextInput from '../../../core/form/TextInput';
import AudioPreview from '../../../core/layout/AudioPreview';

const CertificationTestReviewItemFormDialog = props => (
  <Dialog
    title="Review Item"
    isOpen={props.isOpen}
    onCancel={props.onClose}
    actions={[]}
  >
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <Row>
        <Column size={12}>
          <TextInput
            fieldType="textarea"
            label="Question/Subject"
            value={get(props.values, 'item.text', '')}
            disabled
          />
        </Column>
        <Column size={12}>
          {get(props.values, 'ability', '') === 'SPEAKING' ? (
            <div>
              <p>Answer</p>
              <AudioPreview src={get(props.values, 'answer', '')} />
            </div>
          ) : (
            <TextInput
              fieldType="textarea"
              label="Answer"
              value={get(props.values, 'answer', '')}
              disabled
              textAreaRows={10}
            />
          )}
        </Column>
      </Row>
      <Row>
        <Column size={3}>
          <TextInput
            type="number"
            disabled={props.submitting}
            label="Score"
            value={get(props.values, 'reviewerScore', '')}
            onChange={value => props.onChange('reviewerScore', value)}
            errorText={get(props.errors, 'reviewerScore', '')}
            maxNumberValue={100}
            minNumberValue={0}
          />
        </Column>
      </Row>
      <Row>
        <Column size={12}>
          <TextEditor
            value={get(props.values, 'reviewerComment', '')}
            onChange={value => props.onChange('reviewerComment', value)}
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

CertificationTestReviewItemFormDialog.propTypes = {
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

CertificationTestReviewItemFormDialog.defaultProps = {
  errors: {},
};

export default CertificationTestReviewItemFormDialog;
