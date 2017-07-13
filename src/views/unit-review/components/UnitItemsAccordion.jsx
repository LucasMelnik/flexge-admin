import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../../../core/layout/Paper';
import Accordion from '../../../core/content/Accordion';
import ItemFormContainer from '../../item/components/ItemFormContainer';

const UnitItemsAccordion = props => (
  <Paper>
    <table
      style={{
        borderSpacing: '5px',
      }}
    >
      <tbody>
        <tr>
          <td
            style={{
              width: '100px',
              textAlign: 'center',
            }}
          >
            Order
          </td>
          <td
            style={{
              width: '500px',
              textAlign: 'justify',
            }}
          >
            Text
          </td>
          <td
            style={{
              width: '500px',
              textAlign: 'justify',
              paddingLeft: '30px',
            }}
          >
            Translation
          </td>
          <td
            style={{
              width: '250px',
              paddingLeft: '30px',
              textAlign: 'center',
            }}
          >
            Grammar
          </td>
          <td
            style={{
              width: '200px',
              paddingLeft: '30px',
              textAlign: 'center',
            }}
          >
            Type
          </td>
        </tr>
      </tbody>
    </table>
    {props.items && props.items.map(item => (
      <Accordion
        key={item.id}
        header={(
          <div
            style={{
              display: 'inline-block',
            }}
          >
            <table
              style={{
                borderSpacing: '5px',
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      width: '100px',
                      textAlign: 'center',
                    }}
                  >
                    {item.order}
                  </td>
                  <td
                    style={{
                      width: '500px',
                      textAlign: 'justify',
                    }}
                  >
                    {item.item.text}
                  </td>
                  <td
                    style={{
                      width: '500px',
                      textAlign: 'justify',
                      paddingLeft: '30px',
                    }}
                  >
                    {item.item.translation}
                  </td>
                  <td
                    style={{
                      width: '250px',
                      paddingLeft: '30px',
                      textAlign: 'center',
                    }}
                  >
                    {item.item.grammar && item.item.grammar.name}
                  </td>
                  <td
                    style={{
                      width: '200px',
                      paddingLeft: '30px',
                      textAlign: 'center',
                    }}
                  >
                    {item.item.type && item.item.type.name}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      >
        {props.unit.id && (
          <ItemFormContainer
            itemId={item.item.id}
            disabled
            itemsTypeUrl={`unit-types/${props.unit.type.id}/item-types`}
            showPostPhrase={props.unit.type.name.toLowerCase() === 'vocabulary'}
          />
        )}
      </Accordion>
    ))}
  </Paper>
);

UnitItemsAccordion.propTypes = {
  items: PropTypes.array.isRequired,
  unit: PropTypes.object.isRequired,
};

export default UnitItemsAccordion;
