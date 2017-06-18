import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Separator from '../../../core/layout/Separator';
import Row from "../../../core/layout/Row";
import Column from "../../../core/layout/Column";
import Button from '../../../core/form/Button';
import FetchAutoComplete from '../../../core/form/FetchAutoComplete';
import VideoItemForm from "./forms/VideoItemForm";
import VideoShortItemForm from "./forms/VideoShortItemForm";
import VideoLongTextItemForm from "./forms/VideoLongTextItemForm";
import SingleChoiceItemForm from "./forms/SingleChoiceItemForm";
import DictationItemForm from "./forms/DictationItemForm";
import GapFillItemForm from "./forms/GapFillItemForm";
import GapFillSelectItemForm from "./forms/GapFillSelectItemForm";
import GapFillMultipleItemForm from "./forms/GapFillMultipleItemForm";
import PresentationItemForm from "./forms/PresentationItemForm";
import PronunciationItemForm from "./forms/PronunciationItemForm";
import SpeechPracticeItemForm from "./forms/SpeechPracticeItemForm";
import TextItemForm from "./forms/TextItemForm";
import UnscrambleDragDropItemForm from "./forms/UnscrambleDragDropItemForm";
import UnscrambleSpeechRecognitionItemForm from "./forms/UnscrambleSpeechRecognitionItemForm";
import TrueFalseItemForm from "./forms/TrueFalseItemForm";

const ItemForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column lgSize={6}>
        <FetchAutoComplete
          url="item-types?page=1&size=100"
          fullWidth
          disabled={props.submitting}
          label="Item Type"
          value={get(props.values, 'type.name', '')}
          onSelect={type => {
            props.onChange('type', type);
            props.setValidationsByItemType();
          }}
          errorText={get(props.errors, 'type', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column lgSize={6}>
        <FetchAutoComplete
          url="grammars?page=1&size=100"
          fullWidth
          disabled={props.submitting}
          label="Grammar"
          value={get(props.values, 'grammar.name', '')}
          onSelect={grammar => props.onChange('grammar', grammar)}
          errorText={get(props.errors, 'grammar', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
    </Row>
    {get(props.values, 'type.key', '') === 'VIDEO' && (
      <VideoItemForm
         onChange={props.onChange}
         errors={props.errors}
         values={props.values}
         submitting={props.submitting}
      />
    )}
    {get(props.values, 'type.key', '') === 'VIDEO_SHORT' && (
      <VideoShortItemForm
         onChange={props.onChange}
         errors={props.errors}
         values={props.values}
         submitting={props.submitting}
      />
    )}
    {get(props.values, 'type.key', '') === 'VIDEO_TEXT_AREA' && (
      <VideoLongTextItemForm
         onChange={props.onChange}
         errors={props.errors}
         values={props.values}
         submitting={props.submitting}
      />
    )}
    {get(props.values, 'type.key', '') === 'SINGLE_CHOICE_TEXT' && (
      <SingleChoiceItemForm
         onChange={props.onChange}
         errors={props.errors}
         values={props.values}
         submitting={props.submitting}
      />
    )}
    {get(props.values, 'type.key', '') === 'DICTATION' && (
      <DictationItemForm
         onChange={props.onChange}
         errors={props.errors}
         values={props.values}
         submitting={props.submitting}
      />
    )}
    {get(props.values, 'type.key', '') === 'GAP_FILL' && (
      <GapFillItemForm
         onChange={props.onChange}
         errors={props.errors}
         values={props.values}
         submitting={props.submitting}
      />
    )}
    {get(props.values, 'type.key', '') === 'GAP_FILL_SELECT' && (
      <GapFillSelectItemForm
         onChange={props.onChange}
         errors={props.errors}
         values={props.values}
         submitting={props.submitting}
      />
    )}
    {get(props.values, 'type.key', '') === 'GAP_FILL_MULTIPLE' && (
      <GapFillMultipleItemForm
         onChange={props.onChange}
         errors={props.errors}
         values={props.values}
         submitting={props.submitting}
      />
    )}
    {get(props.values, 'type.key', '') === 'PRESENTATION' && (
      <PresentationItemForm
         onChange={props.onChange}
         errors={props.errors}
         values={props.values}
         submitting={props.submitting}
      />
    )}
    {get(props.values, 'type.key', '') === 'PRONUNCIATION' && (
      <PronunciationItemForm
         onChange={props.onChange}
         errors={props.errors}
         values={props.values}
         submitting={props.submitting}
      />
    )}
    {get(props.values, 'type.key', '') === 'SPEECH_PRACTICE' && (
      <SpeechPracticeItemForm
         onChange={props.onChange}
         errors={props.errors}
         values={props.values}
         submitting={props.submitting}
      />
    )}
    {get(props.values, 'type.key', '') === 'TEXT' && (
      <TextItemForm
         onChange={props.onChange}
         errors={props.errors}
         values={props.values}
         submitting={props.submitting}
      />
    )}
    {get(props.values, 'type.key', '') === 'UNSCRAMBLE_DRAG_AND_DROP' && (
      <UnscrambleDragDropItemForm
         onChange={props.onChange}
         errors={props.errors}
         values={props.values}
         submitting={props.submitting}
      />
    )}
    {get(props.values, 'type.key', '') === 'UNSCRAMBLE_SPEECH_RECOGNITION' && (
      <UnscrambleSpeechRecognitionItemForm
         onChange={props.onChange}
         errors={props.errors}
         values={props.values}
         submitting={props.submitting}
      />
    )}
    {get(props.values, 'type.key', '') === 'TRUE_FALSE' && (
      <TrueFalseItemForm
        onChange={props.onChange}
        errors={props.errors}
        values={props.values}
        submitting={props.submitting}
      />
    )}
    <Separator size="xs" />
    <Button
      icon="done"
      secondary
      fullWidth
      disabled={props.submitting || !props.isDirty()}
      type="submit"
      label={props.values.id ? 'Update Item' : 'Create Item'}
    />
    <Separator size="xs" />
    <Button
      icon="clear"
      fullWidth
      disabled={props.submitting || !props.isDirty()}
      onClick={props.onReset}
      label="Discard Changes"
    />
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
};

ItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  setValidationsByItemType: () => false,
  onReset: () => false,
  onChange: () => false,
};

export default ItemForm;
