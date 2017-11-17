import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import ColumnSeparator from '../../../../core/layout/ColumnSeparator';
import PermissionValidator from '../../../../core/layout/PermissionValidator';
import Select from '../../../../core-ant/Select';
import FetchSelect from '../../../../core-ant/FetchSelect';

const UnitItemErrorListFilter = props => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-end',
    }}
  >
    <PermissionValidator allowedFor={['ADMIN']}>
      <div
        style={{
          display: 'flex',
          zIndex: 3,
        }}
      >
        <div
          style={{
            width: 250,
          }}
        >
          Filter by Course
          <FetchSelect
            url="/courses"
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
        </div>
        <ColumnSeparator />
        <div
          style={{
            width: 250,
          }}
        >
          Filter by Module
          <FetchSelect
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
        </div>
        <ColumnSeparator />
        <div
          style={{
            width: 200,
          }}
        >
          Filter by type
          <Select
            placeholder="Filter by type"
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
            ]}
          />
        </div>
      </div>
    </PermissionValidator>
    <PermissionValidator allowedFor={['ADMIN']}>
      <ColumnSeparator size="sm" />
    </PermissionValidator>
  </div>
);

UnitItemErrorListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func,
};

UnitItemErrorListFilter.defaultProps = {
  fetching: false,
  onSearch: null,
};

export default UnitItemErrorListFilter;
