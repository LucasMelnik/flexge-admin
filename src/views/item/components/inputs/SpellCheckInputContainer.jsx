import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import SpellCheckInput from './SpellCheckInput';
import SpellCheckService from '../../services/SpellCheckService';

class SpellCheckInputContainer extends Component {
  spellCheckService = new SpellCheckService();

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    values: PropTypes.object,
    submitting: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    values: {},
    submitting: false,
    disabled: false,
  };

  render() {
    return (
      <SpellCheckInput
        onSpellCheck={this.spellCheckService.handleSubmit}
        spellChecking={this.spellCheckService.submit.fetching}
        wrongWords={toJS(this.spellCheckService.words)}
        spellCheckStatus={this.spellCheckService.status}
        values={this.props.values}
        onChange={this.props.onChange}
        submitting={this.props.submitting}
        disabled={this.props.disabled}
      />
    );
  }
}

export default observer(SpellCheckInputContainer);
