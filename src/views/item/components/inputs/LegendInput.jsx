import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import head from 'lodash/head';
import last from 'lodash/last';
import orderBy from 'lodash/orderBy';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';

const LegendInput = props => (
  <Row>
    <Column size={12}>
      <TextInput
        label="AWS Transcription for subtitles"
        fieldType="textarea"
        disabled={props.submitting || props.disabled}
        value={get(props.values, 'awsTranscription', '')}
        onChange={value => {
          props.onChange('awsTranscription', value);

          const result = JSON.parse(value).results.items
            .filter(item => item.type === 'punctuation' || (item.type !== 'punctuation' && item.alternatives.some(alternative => alternative.confidence > 0.7)))
            .reduce((acc, item) => {
              if (!acc.length || last(acc).text.match(/[.?]$/)) {
                return [
                  ...acc,
                  {
                    start: item.start_time,
                    end: item.end_time,
                    text: head(orderBy(item.alternatives, 'confidence', 'desc')).content,
                    slices: [
                      {
                        start: item.start_time,
                        end: item.end_time,
                        text: head(orderBy(item.alternatives, 'confidence', 'desc')).content,
                      },
                    ],
                  },
                ];
              } else if (item.type === 'punctuation') {
                const lastItem = last(acc);
                const lastSlice = last(lastItem.slices);

                // lastItem.end = item.end_time;
                lastItem.text = lastItem.text.concat(head(item.alternatives).content);
                lastSlice.text = lastSlice.text.concat(head(item.alternatives).content);
                return acc;
              }

              const lastItem = last(acc);
              lastItem.end = item.end_time;
              lastItem.text = lastItem.text.concat(' ').concat(head(orderBy(item.alternatives, 'confidence', 'desc')).content);
              lastItem.slices = [
                ...lastItem.slices,
                {
                  start: item.start_time,
                  end: item.end_time,
                  text: head(orderBy(item.alternatives, 'confidence', 'desc')).content,
                },
              ];
              return acc;
            }, []);
          props.onChange('subtitles', result);
        }}
        errorText={get(props.errors, 'awsTranscription', '')}
      />
    </Column>
    {get(props.values, 'subtitles', false) && (
      <div>
        <b>Subtitles</b>
        {get(props.values, 'subtitles', []).map(item => (
          <div>
            <span>
              {item.start} - {item.end}:{' '}
            </span>
            {item.text}
          </div>
        ))}
      </div>
    )}
  </Row>
);

LegendInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

LegendInput.defaultProps = {
  values: {},
  errors: {},
  disabled: false,
  submitting: false,
};

export default LegendInput;
