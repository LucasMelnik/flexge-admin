import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../../core/form/Button';
import TextInput from '../../../core/form/TextInput';
import ColumnSeparator from '../../../core/layout/ColumnSeparator';

const MessageChatReplayForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <div
      style={{
        display: 'flex',
        backgroundColor: '#cecece7a',
        border: '1px solid #ececec',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        height: 50,
        padding: 10,
      }}
    >
      <div
        style={{
          display: 'inline-block',
          width: 'calc(100% - 80px)',
        }}
      >
        <TextInput
          style={{
            borderRadius: 7,
            border: 'none',
            outline: 'none',
            padding: '0px 10px',
          }}
          label=""
          placeholder="Type the reply"
          disabled={props.submitting}
          value={get(props.values, 'text', '')}
          onChange={value => props.onChange('text', value)}
          errorText={get(props.errors, 'text', null)}
        />
      </div>
      <ColumnSeparator size="xs" />
      <Button
        label="Send"
        disabled={props.submitting || !props.isDirty()}
        loading={props.submitting}
        buttonType="submit"
      />
    </div>
  </form>
);

MessageChatReplayForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

MessageChatReplayForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
};

export default MessageChatReplayForm;
