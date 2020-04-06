import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import $ from 'jquery';
import Button from '../../../core/form/Button';
import TextInput from '../../../core/form/TextInput';
import ColumnSeparator from '../../../core/layout/ColumnSeparator';

class MessageChatReplayForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    values: PropTypes.object,
    errors: PropTypes.object,
    submitting: PropTypes.bool,
    isDirty: PropTypes.func,
  };

  static defaultProps = {
    values: {},
    errors: {},
    submitting: false,
    isDirty: () => false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit();
    setTimeout(() => $(findDOMNode(this.input)).find('input').focus(), 1000);
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <div
          style={{
            display: 'flex',
            backgroundColor: '#cecece7a',
            borderTop: '1px solid #dedede',
            borderBottomLeftRadius: 3,
            borderBottomRightRadius: 3,
            height: 60,
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
              ref={(input) => { this.input = input; }}
              style={{
                borderRadius: 7,
                border: 'none',
                outline: 'none',
                padding: '0px 10px',
              }}
              label=""
              placeholder="Type the reply"
              disabled={this.props.submitting}
              value={get(this.props.values, 'text', '')}
              onChange={value => this.props.onChange('text', value)}
              errorText={get(this.props.errors, 'text', null)}
            />
          </div>
          <ColumnSeparator size="xs" />
          <Button
            label="Send"
            disabled={this.props.submitting || !this.props.isDirty()}
            loading={this.props.submitting}
            buttonType="submit"
          />
        </div>
      </form>
    );
  }
}


export default MessageChatReplayForm;
