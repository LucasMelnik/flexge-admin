import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import TextEditor from '../../../core/form/TextEditor';

const CertificationTestReviewForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={3}>
        <TextInput
          type="number"
          disabled
          label="Reading Score"
          value={get(props.values, 'readingScore', '')}
          errorText={get(props.errors, 'readingScore', null)}
        />
      </Column>
      <Column size={3}>
        <TextInput
          type="number"
          disabled
          label="Listening Score"
          value={get(props.values, 'listeningScore', '')}
          errorText={get(props.errors, 'listeningScore', null)}
        />
      </Column>
      <Column size={3}>
        <TextInput
          type="number"
          maxNumberValue={100}
          minNumberValue={0}
          disabled={props.submitting}
          label="Writing Score"
          value={get(props.values, 'writingScore', '')}
          onChange={value => props.onChange('writingScore', value)}
          errorText={get(props.errors, 'writingScore', null)}
        />
      </Column>
      <Column size={3}>
        <TextInput
          type="number"
          maxNumberValue={100}
          minNumberValue={0}
          disabled={props.submitting}
          label="Speaking Score"
          value={get(props.values, 'speakingScore', '')}
          onChange={value => props.onChange('speakingScore', value)}
          errorText={get(props.errors, 'speakingScore', null)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={12}>
        <TextEditor
          value={get(props.values, 'comments', '')}
          placeholder="Leave your comments here"
          style={{
            height: 160,
            paddingBottom: 60,
          }}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel="Finish Review"
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

CertificationTestReviewForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

CertificationTestReviewForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default CertificationTestReviewForm;
