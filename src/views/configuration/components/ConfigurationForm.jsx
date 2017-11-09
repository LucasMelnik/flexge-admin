import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import AudioMessageFormContainer from './AudioMessageFormContainer';

const ConfigurationForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column lgSize={4}>
        <TextInput
          type="number"
          disabled={props.submitting}
          label="Points to increase after test failure"
          value={get(props.values, 'pointsToIncreaseAfterTestFailure', '')}
          onChange={value => props.onChange('pointsToIncreaseAfterTestFailure', value)}
          description={get(props.errors, 'pointsToIncreaseAfterTestFailure', null)}
          fieldValidation={get(props.errors, 'pointsToIncreaseAfterTestFailure', null) && 'error'}
        />
      </Column>
      <Column lgSize={4}>
        <TextInput
          type="number"
          disabled={props.submitting}
          label="SR Score to Pass"
          value={get(props.values, 'scoreToPassOfSpeechRecognition', '')}
          onChange={value => props.onChange('scoreToPassOfSpeechRecognition', value)}
          description={get(props.errors, 'scoreToPassOfSpeechRecognition', null)}
          fieldValidation={get(props.errors, 'scoreToPassOfSpeechRecognition', null) && 'error'}
        />
      </Column>
      <Column lgSize={4}>
        <TextInput
          label="Placement Introduction video"
          disabled={props.submitting}
          value={get(props.values, 'videoUrl', '')}
          onChange={(key) => props.onChange('videoUrl', key)}
          description={get(props.errors, 'videoUrl', null)}
          fieldValidation={get(props.errors, 'videoUrl', null) && 'error'}
        />
      </Column>
    </Row>
    <Row>
      <Column lgSize={2}>
        <TextInput
          type="number"
          disabled={props.submitting}
          label="Days to 1 Review"
          value={get(props.values, 'numberOfDayBeforeFirstReview', '')}
          onChange={value => props.onChange('numberOfDayBeforeFirstReview', value)}
          description={get(props.errors, 'numberOfDayBeforeFirstReview', null)}
          fieldValidation={get(props.errors, 'numberOfDayBeforeFirstReview', null) && 'error'}
        />
      </Column>
      <Column lgSize={2}>
        <TextInput
          type="number"
          disabled={props.submitting}
          label="Days to 2 Review"
          value={get(props.values, 'numberOfDayBeforeSecondReview', '')}
          onChange={value => props.onChange('numberOfDayBeforeSecondReview', value)}
          description={get(props.errors, 'numberOfDayBeforeSecondReview', null)}
          fieldValidation={get(props.errors, 'numberOfDayBeforeSecondReview', null) && 'error'}
        />
      </Column>
      <Column lgSize={4}>
        <TextInput
          type="number"
          disabled={props.submitting}
          label="Percentage to enable next group of Modules"
          value={get(props.values, 'percentageToEnableNextModuleGroup', '')}
          onChange={value => props.onChange('percentageToEnableNextModuleGroup', value)}
          description={get(props.errors, 'percentageToEnableNextModuleGroup', null)}
          fieldValidation={get(props.errors, 'percentageToEnableNextModuleGroup', null) && 'error'}
        />
      </Column>
      <Column lgSize={4}>
        <TextInput
          type="number"
          disabled={props.submitting}
          label="Percentage to enable next group of Units"
          value={get(props.values, 'percentageToEnableNextUnitGroup', '')}
          onChange={value => props.onChange('percentageToEnableNextUnitGroup', value)}
          description={get(props.errors, 'percentageToEnableNextUnitGroup', null)}
          fieldValidation={get(props.errors, 'percentageToEnableNextUnitGroup', null) && 'error'}
        />
      </Column>
    </Row>
    <Row>
      <Column lgSize={12}>
        <AudioMessageFormContainer
          title="Correct Audios"
          messages={get(props.values, 'correctAudios', [])}
          onChange={messages => props.onChange('correctAudios', messages)}
        />
      </Column>
    </Row>
    <Row>
      <Column lgSize={12}>
        <AudioMessageFormContainer
          title="Error Audios"
          messages={get(props.values, 'errorAudios', [])}
          onChange={messages => props.onChange('errorAudios', messages)}
        />
      </Column>
    </Row>
    <Row>
      <Column lgSize={12}>
        <AudioMessageFormContainer
          title="First Try Audios"
          messages={get(props.values, 'firstTryAudios', [])}
          onChange={messages => props.onChange('firstTryAudios', messages)}
        />
      </Column>
    </Row>
    <Row>
      <Column lgSize={12}>
        <AudioMessageFormContainer
          title="Second Try Audios"
          messages={get(props.values, 'secondTryAudios', [])}
          onChange={messages => props.onChange('secondTryAudios', messages)}
        />
      </Column>
    </Row>
    <Row>
      <Column lgSize={12}>
        <AudioMessageFormContainer
          title="Option Audios"
          messages={get(props.values, 'optionAudios', [])}
          onChange={messages => props.onChange('optionAudios', messages)}
        />
      </Column>
    </Row>
    <Row>
      <Column lgSize={12}>
        <AudioMessageFormContainer
          title="Speech Recognition Error Audios"
          messages={get(props.values, 'speechRecognitionErrorAudios', [])}
          onChange={messages => props.onChange('speechRecognitionErrorAudios', messages)}
        />
      </Column>
    </Row>
    <Row>
      <Column lgSize={12}>
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
  onChange: () => false,
};

export default ConfigurationForm;
