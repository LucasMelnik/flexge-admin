import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import FetchSelect from '../../../../core/form/FetchSelect';
import Select from '../../../../core/form/Select';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';

const UnitItemErrorListFilter = props => (
  <Row>
    <Column size={4}>
      <FetchSelect
        url="/courses"
        label="Select the course"
        disabled={props.fetching}
        value={get(props.values, 'course')}
        onChange={(value) => {
          props.onChange('course', value);
          props.onChange('module', null);
          props.onChange('type', null);
          props.onSearch();
        }}
        resultTransformer={{
          text: 'name',
          value: 'id',
        }}
      />
    </Column>
    <Column size={4}>
      <FetchSelect
        label="Filter by module"
        placeholder="Select the course to allow select the  module"
        url={props.values.course && `/modules?query[course]=${get(props.values, 'course', '')}`}
        disabled={props.fetching || !props.values.course}
        value={get(props.values, 'module')}
        onChange={(value) => {
          props.onChange('module', value);
          props.onChange('type', null);
          props.onSearch();
        }}
        resultTransformer={{
          text: 'name',
          value: 'id',
        }}
      />
    </Column>
    <Column size={4}>
      <Select
        label="Filter by type"
        value={get(props.values, 'type', '')}
        onChange={(value) => {
          props.onChange('type', value);
          props.onFilter();
        }}
        disabled={props.fetching || !props.values.course || !props.values.module}
        options={[
          {
            label: 'END_WHITE_SPACE',
            value: 'END_WHITE_SPACE',
          },
          {
            label: 'LINE_BREAK',
            value: 'LINE_BREAK',
          },
          {
            label: 'NO_AUDIO',
            value: 'NO_AUDIO',
          },
          {
            label: 'START_WHITE_SPACE',
            value: 'START_WHITE_SPACE',
          },
          {
            label: 'ORDER_GAP',
            value: 'ORDER_GAP',
          },
          {
            label: 'WRONG_ACCENT',
            value: 'WRONG_ACCENT',
          },
          {
            label: 'DUPLICATE_ORDER_GROUP',
            value: 'DUPLICATE_ORDER_GROUP',
          },
          {
            label: 'WRONG_FINAL_PUNCTUATION_TEXT',
            value: 'WRONG_FINAL_PUNCTUATION_TEXT',
          },
          {
            label: 'WRONG_FINAL_PUNCTUATION_TRANSLATION',
            value: 'WRONG_FINAL_PUNCTUATION_TRANSLATION',
          },
          {
            label: 'START_LOWER_CASE_TEXT',
            value: 'START_LOWER_CASE_TEXT',
          },
          {
            label: 'START_LOWER_CASE_TRANSLATION',
            value: 'START_LOWER_CASE_TRANSLATION',
          },
          {
            label: 'NO_NATIVE_AUDIO',
            value: 'NO_NATIVE_AUDIO',
          },
          {
            label: 'NO_NATIVE_ANSWER_AUDIO',
            value: 'NO_NATIVE_ANSWER_AUDIO',
          },
          {
            label: 'NO_NATIVE_POST_PHRASE_AUDIO',
            value: 'NO_NATIVE_POST_PHRASE_AUDIO',
          },
          {
            label: 'SPEECH_ACE_ERROR',
            value: 'SPEECH_ACE_ERROR',
          },
          {
            label: 'NO_IMAGE',
            value: 'NO_IMAGE',
          },
          {
            label: 'UNSCRAMBLE_4_CHUNK',
            value: 'UNSCRAMBLE_4_CHUNK',
          },
          {
            label: 'SECOND_REVIEW_ERROR',
            value: 'SECOND_REVIEW_ERROR',
          },
        ]}
      />
    </Column>
  </Row>
);

UnitItemErrorListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
};

UnitItemErrorListFilter.defaultProps = {
  fetching: false,
};

export default UnitItemErrorListFilter;
