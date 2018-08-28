import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Dialog from '../../../core/layout/Dialog';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import FormButtons from '../../../core/form/FormButtons';
import TextEditor from '../../../core/form/TextEditor';
import Select from '../../../core/form/Select';
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
            />
          )}
        </Column>
      </Row>
      <Row>
        <Column size={3}>
          <Select
            disabled={props.submitting}
            label="Correct"
            value={get(props.values, 'correct', '')}
            onChange={value => props.onChange('correct', value)}
            errorText={get(props.errors, 'correct', '')}
            options={[
              {
                label: 'Correct',
                value: 'correct',
              },
              {
                label: 'Wrong',
                value: 'wrong',
              },
            ]}
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
