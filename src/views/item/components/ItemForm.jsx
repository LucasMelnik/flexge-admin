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
import FreeTextItemForm from './forms/FreeTextItemForm';
import FreeSpeakItemForm from './forms/FreeSpeakItemForm';
import FreeTextImageItemForm from './forms/FreeTextImageItemForm';
import FreeSpeakImageItemForm from './forms/FreeSpeakImageItemForm';

const needCharacter = itemType => localStorage.getItem('role') === 'ADMIN' && ![
  'VIDEO',
  'VIDEO_SHORT',
  'VIDEO_TEXT_AREA',
  'TEXT',
].find(type => type === itemType);

const ItemForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Async fetching={props.fetching}>
      <Row>
        <Column size={4}>
          <FetchSelect
            required
            url={props.itemsTypeUrl}
            disabled={props.submitting || props.disabled}
            label="Item Type"
            value={get(props.values, 'item.type.id', '')}
            onChange={(value, type) => {
              props.onChange('item.type', type);
              if (type) {
                props.onChange('item.time', type[props.timeProperty]);
              }
              props.setValidationsByItemType();
            }}
            errorText={get(props.errors, 'item.type', '')}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
        <Column size={2}>
          <TimeInput
            required
            disabled={props.submitting || props.disabled || props.isTestItem}
            label="Time (minutes)"
            value={get(props.values, 'item.time', '')}
            onChange={value => props.onChange('item.time', value)}
            errorText={get(props.errors, 'item.time', '')}
          />
        </Column>
        <Column size={needCharacter(get(props.values.item, 'type.key')) ? 3 : 6}>
          <FetchSelect
            url="grammars"
            disabled={props.submitting || props.disabled || !!props.defaultGrammar}
            label="Grammar"
            value={get(props.values, 'item.grammar.id', '')}
            onChange={(value, grammar) => props.onChange('item.grammar', grammar)}
            errorText={get(props.errors, 'item.grammar', '')}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
        {needCharacter(get(props.values.item, 'type.key')) && (
          <Column size={3}>
            <FetchSelect
              url="characters"
              disabled={props.submitting || props.disabled}
              label="Character"
              value={get(props.values, 'item.character', '')}
              onChange={(character) => props.onChange('item.character', character)}
              errorText={get(props.errors, 'item.character', '')}
              resultTransformer={{
                text: 'name',
                value: 'id',
              }}
            />
          </Column>
        )}
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
          type={get(props.values.item, 'type.key')}
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
      {get(props.values.item, 'type.key', '') === 'FREE_TEXT' && (
        <FreeTextItemForm
          onChange={(path, value) => props.onChange(`item.${path}`, value)}
          errors={get(props.errors, 'item', {})}
          values={props.values.item}
          submitting={props.submitting}
          disabled={props.disabled}
        />
      )}
      {get(props.values.item, 'type.key', '') === 'FREE_TEXT_IMAGE' && (
        <FreeTextImageItemForm
          onChange={(path, value) => props.onChange(`item.${path}`, value)}
          errors={get(props.errors, 'item', {})}
          values={props.values.item}
          submitting={props.submitting}
          disabled={props.disabled}
        />
      )}
      {get(props.values.item, 'type.key', '') === 'FREE_SPEAK' && (
        <FreeSpeakItemForm
          onChange={(path, value) => props.onChange(`item.${path}`, value)}
          errors={get(props.errors, 'item', {})}
          values={props.values.item}
          submitting={props.submitting}
          disabled={props.disabled}
        />
      )}
      {get(props.values.item, 'type.key', '') === 'FREE_SPEAK_IMAGE' && (
        <FreeSpeakImageItemForm
          onChange={(path, value) => props.onChange(`item.${path}`, value)}
          errors={get(props.errors, 'item', {})}
          values={props.values.item}
          submitting={props.submitting}
          disabled={props.disabled}
        />
      )}
      <Separator size="xs" />
      {!props.disabled && (
        <FormButtons
          confirmLabel={props.values.id || get(props.values, 'item.id', '') ? 'Update Item' : 'Create Item'}
          isDisabled={props.submitting || !props.isDirty()}
          isSubmitting={props.submitting}
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
  fetching: PropTypes.bool,
  isDirty: PropTypes.func,
  itemsTypeUrl: PropTypes.string.isRequired,
  timeProperty: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  isTestItem: PropTypes.bool,
};

ItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  fetching: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  setValidationsByItemType: () => false,
  onReset: () => false,
  disabled: false,
  isTestItem: false,
};

export default ItemForm;
