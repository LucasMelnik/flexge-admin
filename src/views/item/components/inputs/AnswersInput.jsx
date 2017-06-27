import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Flex from 'jsxstyle/Flex';
import Separator from '../../../../core/layout/Separator';
import ColumnSeparator from '../../../../core/layout/ColumnSeparator';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';
import Button from '../../../../core/form/Button';
import Select from '../../../../core/form/Select';
import Table from '../../../../core/content/Table';
import ErrorText from "../../../../core/content/ErrorText";

const AnswersInput = props => (
  <div>
    {!props.disabled && (
      <Flex
        alignItems="center"
      >
        <TextInput
          id="answer"
          floatingLabel
          disabled={props.submitting}
          label={props.label}
          value={get(props.values, 'text', '')}
          onChange={value => props.onChange('text', value)}
          errorText={get(props.errors, 'text', '')}
        />
        <ColumnSeparator size="sm" />
        {props.answerType === 'BOTH' && (
          <Select
            label="Is this a Correct answer ?"
            value={get(props.values, 'correct', '')}
            onChange={value => props.onChange('correct', value)}
            options={[
              { value: false, label: 'No' },
              { value: true, label: 'Yes' },
            ]}
          />
        )}
        {props.answerType === 'BOTH' && (
          <ColumnSeparator size="sm" />
        )}
        <Button
          icon="done"
          secondary
          label={props.values.id ? 'Update' : 'Add'}
          disabled={!props.isDirty()}
          onClick={() => props.onSubmit()}
        />
        <ColumnSeparator size="xs" />
        <Button
          icon="clear"
          label="Cancel"
          onClick={() => props.onReset()}
        />
      </Flex>
    )}
    <Separator size="xs" />
    <Row>
      <Column lgSize={12}>
        <Table
          columns={[
            {
              label: 'Answer',
              path: 'text',
            },
            {
              label: 'Correct',
              path: 'correct',
            },
          ]}
          rows={props.answers}
          onDelete={!props.disabled ? (row) => props.onDelete(row.id) : null}
          onSelect={!props.disabled ? (row) => props.onEdit(row.id) : null}
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
  label: PropTypes.string.isRequired,
  errorText: PropTypes.string,
  values: PropTypes.object,
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
  errorText: null,
  disabled: false,
};

export default AnswersInput;
