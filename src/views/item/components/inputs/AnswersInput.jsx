import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import ColumnSeparator from '../../../../core/layout/ColumnSeparator';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';
import Button from '../../../../core/form/Button';
import Select from '../../../../core/form/Select';
import FileInput from '../../../../core/form/FileInput';
import Table from '../../../../core/form/Table';
import AudioPreview from '../../../../core/layout/AudioPreview';
import ImagePreview from '../../../../core/layout/ImagePreview';
import ErrorText from '../../../../core/layout/ErrorText';
import SpellCheckInputContainer from './SpellCheckInputContainer';
import Separator from '../../../../core/layout/Separator';

const AnswersInput = props => (
  <div>
    {!props.disabled && (
      <Row>
        <Column
          size={props.answerType === 'BOTH' ? 7 : 6}
        >
          <TextInput
            label={props.label}
            value={get(props.values, 'text', '')}
            onChange={value => props.onChange('text', value)}
            errorText={get(props.errors, 'text', '')}
          />
        </Column>
        {props.answerType === 'BOTH' && (
          <Column size={2}>
            <Select
              label="Is this a Correct answer ?"
              value={get(props.values, 'correct', '')}
              onChange={value => props.onChange('correct', value)}
              errorText={get(props.errors, 'correct', '')}
              options={[
                { value: false, label: 'No' },
                { value: true, label: 'Yes' },
              ]}
            />
          </Column>
        )}
      </Row>
    )}
    {(!props.disabled && props.allowSpellCheck) && (
      <SpellCheckInputContainer
        onChange={props.onChange}
        values={props.values}
        disabled={props.disabled}
      />
    )}
    {!props.disabled && (
      <Row>
        <Column size={3}>
          <FileInput
            label="Upload an audio to the answer"
            accept="audio"
            value={get(props.values, 'audio', '')}
            onChange={(key) => props.onChange('audio', key)}
            errorText={get(props.errors, 'audio', '')}
          />
        </Column>
        <Column size={3}>
          <FileInput
            label="Upload an image to the answer"
            accept="image"
            value={get(props.values, 'image', '')}
            onChange={(key) => props.onChange('image', key)}
            errorText={get(props.errors, 'image', '')}
          />
        </Column>
      </Row>
    )}
    {!props.disabled && (
      <Row>
        <Column size={12}>
          <Button
            icon="check"
            type="primary"
            label={props.values.id ? 'Update' : 'Add'}
            disabled={!props.isDirty()}
            onClick={() => props.onSubmit()}
          />
          <ColumnSeparator size="xs" />
          <Button
            icon="reload"
            label="Discard"
            onClick={() => props.onReset()}
          />
        </Column>
      </Row>
    )}
    <Separator size="sm" />
    <Row>
      <Column size={12}>
        <Table
          columns={[
            {
              label: 'Answer',
              path: 'text',
              width: '350px',
            },
            {
              label: 'Correct',
              path: 'correct',
              width: '105px',
              render: (cell) => cell ? 'Yes' : 'No',
            },
            {
              label: 'Generated Audio',
              render: (cell, row) => {
                if (row.generatedAudio) {
                  return (<AudioPreview src={row.generatedAudio} />);
                }
                return '-';
              },
            },
            {
              label: 'Audio',
              render: (cell, row) => {
                if (row.audio) {
                  return (<AudioPreview src={row.audio} />);
                }
                return 'No Audio uploaded';
              },
            },
            {
              label: 'Image',
              render: (cell, row) => {
                if (row.image) {
                  return (<ImagePreview src={row.image} />);
                } else if (props.type === 'SINGLE_CHOICE_IMAGE') {
                  return 'No Image uploaded';
                }
                return '-';
              },
            },
            {
              label: 'Actions',
              path: 'action',
              width: '105px',
              render: (cell, row) => {
                if (!props.disabled) {
                  return (
                    <div>
                      <Button
                        icon="delete"
                        onClick={() => props.onDelete(row.id)}
                      />
                      {' '}
                      <Button
                        icon="edit"
                        onClick={() => props.onEdit(row.id)}
                      />
                    </div>
                  );
                }
                return null;
              },
            },
          ]}
          rows={props.answers}
        />
        {props.errorText && (
          <ErrorText>{props.errorText}</ErrorText>
        )}
      </Column>
    </Row>
  </div>
);

AnswersInput.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    correct: PropTypes.bool.isRequired,
  })),
  answerType: PropTypes.oneOf([
    'CORRECT',
    'WRONG',
    'BOTH',
  ]).isRequired,
  disabled: PropTypes.bool,
  allowSpellCheck: PropTypes.bool,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'SINGLE_CHOICE_TEXT',
    'SINGLE_CHOICE_AUDIO',
    'SINGLE_CHOICE_IMAGE',
    'SINGLE_CHOICE_GAME',
  ]),
  errorText: PropTypes.string,
  values: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  isDirty: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

AnswersInput.defaultProps = {
  answers: [],
  values: {},
  errors: {},
  errorText: null,
  type: null,
  disabled: false,
  allowSpellCheck: false,
};

export default AnswersInput;
