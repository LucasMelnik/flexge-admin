import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import AudioMessageFormContainer from './AudioMessageFormContainer';
import FetchSelect from '../../../core/form/FetchSelect';

const ConfigurationForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={6}>
        <TextInput
          required
          disabled={props.submitting}
          label="Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', null)}
        />
      </Column>
      <Column size={6}>
        <FetchSelect
          url="academic-plans"
          required
          fullWidth
          multiple
          disabled={props.submitting}
          label="Academic Plans"
          value={get(props.values, 'academicPlans', '')}
          onChange={value => props.onChange('academicPlans', value)}
          errorText={get(props.errors, 'academicPlans', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
    </Row>
    <Row>
      <Column size={3}>
        <TextInput
          type="number"
          required
          disabled={props.submitting}
          label="Units to finish after test failure"
          value={get(props.values, 'unitsToFinishAfterTestFailure', '')}
          onChange={value => props.onChange('unitsToFinishAfterTestFailure', value)}
          errorText={get(props.errors, 'unitsToFinishAfterTestFailure', null)}
        />
      </Column>
      <Column size={3}>
        <TextInput
          type="number"
          required
          disabled={props.submitting}
          label="Units to finish after certification test failure"
          value={get(props.values, 'unitsToFinishAfterCertificationTestFailure', '')}
          onChange={value => props.onChange('unitsToFinishAfterCertificationTestFailure', value)}
          errorText={get(props.errors, 'unitsToFinishAfterCertificationTestFailure', null)}
        />
      </Column>
      <Column size={3}>
        <TextInput
          type="number"
          required
          disabled={props.submitting}
          label="SR Score to Pass"
          value={get(props.values, 'scoreToPassOfSpeechRecognition', '')}
          onChange={value => props.onChange('scoreToPassOfSpeechRecognition', value)}
          errorText={get(props.errors, 'scoreToPassOfSpeechRecognition', null)}
        />
      </Column>
      <Column size={1.5}>
        <TextInput
          type="number"
          disabled={props.submitting}
          label="Days to 1 Review"
          required
          value={get(props.values, 'numberOfDayBeforeFirstReview', '')}
          onChange={value => props.onChange('numberOfDayBeforeFirstReview', value)}
          errorText={get(props.errors, 'numberOfDayBeforeFirstReview', null)}
        />
      </Column>
      <Column size={1.5}>
        <TextInput
          type="number"
          disabled={props.submitting}
          label="Days to 2 Review"
          required
          value={get(props.values, 'numberOfDayBeforeSecondReview', '')}
          onChange={value => props.onChange('numberOfDayBeforeSecondReview', value)}
          errorText={get(props.errors, 'numberOfDayBeforeSecondReview', null)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={2}>
        <TextInput
          required
          label="Placement Introduction video PT"
          disabled={props.submitting}
          value={get(props.values, 'videoUrl.pt', '')}
          onChange={(key) => props.onChange('videoUrl.pt', key)}
          errorText={get(props.errors, 'videoUrl.pt', null)}
        />
      </Column>
      <Column size={2}>
        <TextInput
          label="Placement Introduction video EN"
          disabled={props.submitting}
          value={get(props.values, 'videoUrl.en', '')}
          onChange={(key) => props.onChange('videoUrl.en', key)}
          errorText={get(props.errors, 'videoUrl.en', null)}
        />
      </Column>
      <Column size={2}>
        <TextInput
          label="Placement Introduction video ES"
          disabled={props.submitting}
          value={get(props.values, 'videoUrl.es', '')}
          onChange={(key) => props.onChange('videoUrl.es', key)}
          errorText={get(props.errors, 'videoUrl.es', null)}
        />
      </Column>
      <Column size={3}>
        <TextInput
          type="number"
          required
          disabled={props.submitting}
          label="Percentage to enable next group of Modules"
          value={get(props.values, 'percentageToEnableNextModuleGroup', '')}
          onChange={value => props.onChange('percentageToEnableNextModuleGroup', value)}
          errorText={get(props.errors, 'percentageToEnableNextModuleGroup', null)}
        />
      </Column>
      <Column size={3}>
        <TextInput
          type="number"
          required
          disabled={props.submitting}
          label="Percentage to enable next group of Units"
          value={get(props.values, 'percentageToEnableNextUnitGroup', '')}
          onChange={value => props.onChange('percentageToEnableNextUnitGroup', value)}
          errorText={get(props.errors, 'percentageToEnableNextUnitGroup', null)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={12}>
        <AudioMessageFormContainer
          title="Correct Audios"
          messages={get(props.values, 'correctAudios', [])}
          onChange={messages => props.onChange('correctAudios', messages)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={12}>
        <AudioMessageFormContainer
          title="Error Audios"
          messages={get(props.values, 'errorAudios', [])}
          onChange={messages => props.onChange('errorAudios', messages)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={12}>
        <AudioMessageFormContainer
          title="First Try Audios"
          messages={get(props.values, 'firstTryAudios', [])}
          onChange={messages => props.onChange('firstTryAudios', messages)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={12}>
        <AudioMessageFormContainer
          title="Second Try Audios"
          messages={get(props.values, 'secondTryAudios', [])}
          onChange={messages => props.onChange('secondTryAudios', messages)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={12}>
        <AudioMessageFormContainer
          title="Option Audios"
          messages={get(props.values, 'optionAudios', [])}
          onChange={messages => props.onChange('optionAudios', messages)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={12}>
        <AudioMessageFormContainer
          title="Speech Recognition Error Audios"
          messages={get(props.values, 'speechRecognitionErrorAudios', [])}
          onChange={messages => props.onChange('speechRecognitionErrorAudios', messages)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={12}>
        <AudioMessageFormContainer
          title="User Away Audios"
          messages={get(props.values, 'userAwayAudios', [])}
          onChange={messages => props.onChange('userAwayAudios', messages)}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Configuration' : 'Create Configuration'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

ConfigurationForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

ConfigurationForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default ConfigurationForm;
