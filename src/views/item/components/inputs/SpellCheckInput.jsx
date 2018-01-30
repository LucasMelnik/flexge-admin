import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import Button from '../../../../core/form/Button';
import TextInput from '../../../../core/form/TextInput';
import Separator from '../../../../core/layout/Separator';

const SpellCheckInput = props => (
  <div>
    <Row>
      <Column size={12}>
        <Button
          disabled={props.submitting || props.disabled || !get(props.values, 'text', undefined)}
          label="Spell Check"
          loading={props.spellChecking}
          onClick={() => props.onSpellCheck(get(props.values, 'text', undefined))}
        />
        <span
          style={{
            color: props.spellCheckStatus === 'OK' ? 'green' : 'red',
            marginLeft: 10,
          }}
        >
          {props.spellCheckStatus === 'OK' && 'Great! no error found.'}
          {props.spellCheckStatus === 'ERROR' && 'Check the fields below.'}
        </span>
        <Separator />
      </Column>
    </Row>
    {props.spellCheckStatus === 'ERROR' && (
      <Row>
        <Column size={12}>
          {props.wrongWords.map(word => (
            <span
              style={{
                display: 'inline-block',
                marginRight: 10,
              }}
            >
              <TextInput
                label={word}
                disabled={props.submitting || props.disabled}
                value={get(props.values, `speechRecognitionDictionary.${word}`, '')}
                onChange={(value) => {
                  props.onChange('speechRecognitionDictionary', {
                    ...get(props.values, 'speechRecognitionDictionary', {}),
                    [word]: value,
                  });
                }}
              />
            </span>
          ))}
        </Column>
      </Row>
    )}
  </div>
);

SpellCheckInput.propTypes = {
  onSpellCheck: PropTypes.func.isRequired,
  wrongWords: PropTypes.arrayOf(PropTypes.string).isRequired,
  spellCheckStatus: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  spellChecking: PropTypes.bool.isRequired,
  values: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

SpellCheckInput.defaultProps = {
  values: {},
  disabled: false,
  submitting: false,
};

export default SpellCheckInput;