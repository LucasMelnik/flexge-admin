import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import UndoIcon from 'material-ui/svg-icons/content/undo';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import ErrorText from "../../../../core/content/ErrorText";

const SlicesToRemove = props => (
  <Row>
    <Column lgSize={12}>
      {props.slices.length > 0 && (
        <div>
          <small>Here you must click on the X button to select the word(s) to hide.</small>
          <div style={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {props.slices.map((sliceText, index) => {
              if (props.removedSlices.find(removedIndex => removedIndex === index) === undefined) {
                return (
                  <Chip
                    key={`slice-${sliceText}-${index}`}
                    onRequestDelete={!props.disableRemove ? () => props.onRemoveSlice(index) : null}
                    style={{
                      margin: '10px 5px',
                    }}
                  >
                    {sliceText}
                  </Chip>
                )
              } else {
                return (
                  <Chip
                    key={`slice-${sliceText}-${index}`}
                    style={{
                      margin: '10px 5px',
                    }}
                    labelStyle={{
                      lineHeight: '12px',
                    }}
                  >
                    <IconButton
                      style={{
                        padding: 0,
                        height: 30,
                      }}
                      tooltip={`Show "${sliceText}"`}
                      onClick={() => props.onShowSlice(index)}
                    >
                      <UndoIcon />
                    </IconButton>
                  </Chip>
                )
              }
            })}
          </div>
          {props.errorText && (
           <ErrorText>{props.errorText}</ErrorText>
          )}
        </div>
      )}
    </Column>
  </Row>
);

SlicesToRemove.propTypes = {
  slices: PropTypes.arrayOf(PropTypes.string).isRequired,
  removedSlices: PropTypes.arrayOf(PropTypes.number).isRequired,
  onRemoveSlice: PropTypes.func.isRequired,
  onShowSlice: PropTypes.func.isRequired,
  errorText: PropTypes.string,
  disableRemove: PropTypes.bool.isRequired,
};

SlicesToRemove.defaultProps = {
  errorText: null,
};

export default SlicesToRemove;
