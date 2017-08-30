import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Separator from '../../../core/layout/Separator';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import FetchSelect from '../../../core/form/FetchSelect';
import VideoItemForm from './forms/VideoItemForm';
import VideoShortItemForm from './forms/VideoShortItemForm';
import VideoLongTextItemForm from './forms/VideoLongTextItemForm';
import SingleChoiceItemForm from './forms/SingleChoiceItemForm';
import DictationItemForm from './forms/DictationItemForm';
import GapFillItemForm from './forms/GapFillItemForm';
import GapFillSelectItemForm from './forms/GapFillSelectItemForm';
import GapFillMultipleItemForm from './forms/GapFillMultipleItemForm';
import PresentationItemForm from './forms/PresentationItemForm';
import PronunciationItemForm from './forms/PronunciationItemForm';
import SpeechPracticeItemForm from './forms/SpeechPracticeItemForm';
import TextItemForm from './forms/TextItemForm';
import UnscrambleDragDropItemForm from './forms/UnscrambleDragDropItemForm';
import UnscrambleSpeechRecognitionItemForm from './forms/UnscrambleSpeechRecognitionItemForm';
import TrueFalseItemForm from './forms/TrueFalseItemForm';
import TimeInput from '../../../core/form/TimeInput';
import Async from '../../../core/layout/Async';
import FormButtons from '../../../core/form/FormButtons';

const ItemForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Async fetching={props.fetching}>
      <Row>
        <Column lgSize={4}>
          <FetchSelect
            url={props.itemsTypeUrl}
            disabled={props.submitting || props.disabled}
            label="Item Type"
            value={get(props.values, 'item.type.id', '')}
            onChange={(value, type) => {
              props.onChange('item.type', type);
              if (type) {
                props.onChange('item.time', props.isTestItem ? type.defaultTestTime : type.defaultTime);
              }
              props.setValidationsByItemType();
            }}
            description={get(props.errors, 'item.type', '')}
            fieldValidation={get(props.errors, 'item.type', null) && 'error'}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
        <Column lgSize={2}>
          <TimeInput
            disabled={props.submitting || props.disabled || props.isTestItem}
            label="Time (minutes)"
            value={get(props.values, 'item.time', '')}
            onChange={value => props.onChange('item.time', value)}
            description={get(props.errors, 'item.time', '')}
            fieldValidation={get(props.errors, 'item.time', null) && 'error'}
          />
        </Column>
        <Column lgSize={6}>
          <FetchSelect
            url="grammars"
            disabled={props.submitting || props.disabled || !!props.defaultGrammar}
            label="Grammar"
            value={get(props.values, 'item.grammar.id', '')}
            onChange={(value, grammar) => props.onChange('item.grammar', grammar)}
            description={get(props.errors, 'item.grammar', '')}
            fieldValidation={get(props.errors, 'item.grammar', null) && 'error'}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      </Row>
      {get(props.values.item, 'type.key', '') === 'VIDEO' && (
        <VideoItemForm
          onChange={(path, value) => props.onChange(`item.${path}`, value)}
          errors={get(props.errors, 'item', {})}
          values={props.values.item}
          submitting={props.submitting}
          disabled={props.disabled}
        />
      )}
      {get(props.values.item, 'type.key', '') === 'VIDEO_SHORT' && (
        <VideoShortItemForm
          onChange={(path, value) => props.onChange(`item.${path}`, value)}
          errors={get(props.errors, 'item', {})}
          values={props.values.item}
          submitting={props.submitting}
          disabled={props.disabled}
          isTestItem={props.isTestItem}
        />
      )}
      {get(props.values.item, 'type.key', '') === 'VIDEO_TEXT_AREA' && (
        <VideoLongTextItemForm
          onChange={(path, value) => props.onChange(`item.${path}`, value)}
          errors={get(props.errors, 'item', {})}
          values={props.values.item}
          submitting={props.submitting}
          disabled={props.disabled}
        />
      )}
      {['SINGLE_CHOICE_TEXT', 'SINGLE_CHOICE_AUDIO', 'SINGLE_CHOICE_IMAGE'].find(type => type === get(props.values.item, 'type.key')) && (
        <SingleChoiceItemForm
          onChange={(path, value) => props.onChange(`item.${path}`, value)}
          errors={get(props.errors, 'item', {})}
          values={props.values.item}
          submitting={props.submitting}
          disabled={props.disabled}
          isTestItem={props.isTestItem}
          showPostPhrase={get(props.values.item, 'type.key') === 'SINGLE_CHOICE_IMAGE'}
        />
      )}
      {get(props.values.item, 'type.key', '') === 'DICTATION' && (
        <DictationItemForm
          onChange={(path, value) => props.onChange(`item.${path}`, value)}
          errors={get(props.errors, 'item', {})}
          values={props.values.item}
          submitting={props.submitting}
          disabled={props.disabled}
          isTestItem={props.isTestItem}
        />
      )}
      {get(props.values.item, 'type.key', '') === 'GAP_FILL' && (
        <GapFillItemForm
          onChange={(path, value) => props.onChange(`item.${path}`, value)}
          errors={get(props.errors, 'item', {})}
          values={props.values.item}
          submitting={props.submitting}
          disabled={props.disabled}
          isTestItem={props.isTestItem}
        />
      )}
      {get(props.values.item, 'type.key', '') === 'GAP_FILL_SELECT' && (
        <GapFillSelectItemForm
          onChange={(path, value) => props.onChange(`item.${path}`, value)}
          errors={get(props.errors, 'item', {})}
          values={props.values.item}
          submitting={props.submitting}
          disabled={props.disabled}
          isTestItem={props.isTestItem}
        />
      )}
      {get(props.values.item, 'type.key', '') === 'GAP_FILL_MULTIPLE' && (
        <GapFillMultipleItemForm
          onChange={(path, value) => props.onChange(`item.${path}`, value)}
          errors={get(props.errors, 'item', {})}
          values={props.values.item}
          submitting={props.submitting}
          disabled={props.disabled}
          isTestItem={props.isTestItem}
        />
      )}
      {get(props.values.item, 'type.key', '') === 'PRESENTATION' && (
        <PresentationItemForm
          onChange={(path, value) => props.onChange(`item.${path}`, value)}
          errors={get(props.errors, 'item', {})}
          values={props.values.item}
          submitting={props.submitting}
          disabled={props.disabled}
          isTestItem={props.isTestItem}
          showPostPhrase={props.showPostPhrase}
        />
      )}
      {get(props.values.item, 'type.key', '') === 'PRONUNCIATION' && (
        <PronunciationItemForm
          onChange={(path, value) => props.onChange(`item.${path}`, value)}
          errors={get(props.errors, 'item', {})}
          values={props.values.item}
          submitting={props.submitting}
          disabled={props.disabled}
          isTestItem={props.isTestItem}
        />
      )}
      {get(props.values.item, 'type.key', '') === 'SPEECH_PRACTICE' && (
        <SpeechPracticeItemForm
          onChange={(path, value) => props.onChange(`item.${path}`, value)}
          errors={get(props.errors, 'item', {})}
          values={props.values.item}
          submitting={props.submitting}
          disabled={props.disabled}
          isTestItem={props.isTestItem}
        />
      )}
      {get(props.values.item, 'type.key', '') === 'TEXT' && (
        <TextItemForm
          onChange={(path, value) => props.onChange(`item.${path}`, value)}
          errors={get(props.errors, 'item', {})}
          values={props.values.item}
          submitting={props.submitting}
          disabled={props.disabled}
        />
      )}
      {get(props.values.item, 'type.key', '') === 'UNSCRAMBLE_DRAG_AND_DROP' && (
        <UnscrambleDragDropItemForm
          onChange={(path, value) => props.onChange(`item.${path}`, value)}
          errors={get(props.errors, 'item', {})}
          values={props.values.item}
          submitting={props.submitting}
          disabled={props.disabled}
          isTestItem={props.isTestItem}
        />
      )}
      {get(props.values.item, 'type.key', '') === 'UNSCRAMBLE_SPEECH_RECOGNITION' && (
        <UnscrambleSpeechRecognitionItemForm
          onChange={(path, value) => props.onChange(`item.${path}`, value)}
          errors={get(props.errors, 'item', {})}
          values={props.values.item}
          submitting={props.submitting}
          disabled={props.disabled}
          isTestItem={props.isTestItem}
        />
      )}
      {get(props.values.item, 'type.key', '') === 'TRUE_FALSE' && (
        <TrueFalseItemForm
          onChange={(path, value) => props.onChange(`item.${path}`, value)}
          errors={get(props.errors, 'item', {})}
          values={props.values.item}
          submitting={props.submitting}
          disabled={props.disabled}
          isTestItem={props.isTestItem}
        />
      )}
      <Separator size="xs" />
      {!props.disabled && (
        <FormButtons
          confirmLabel={props.values.id ? 'Update Item' : 'Create Item'}
          isDisabled={props.submitting || !props.isDirty()}
          onReset={props.onReset}
        />
      )}
    </Async>
  </form>
);

ItemForm.propTypes = {
  onSubmit: PropTypes.func,
  setValidationsByItemType: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
  itemsTypeUrl: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  isTestItem: PropTypes.bool,
};

ItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  showPostPhrase: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  setValidationsByItemType: () => false,
  onReset: () => false,
  onChange: () => false,
  disabled: false,
  isTestItem: false,
};

export default ItemForm;
