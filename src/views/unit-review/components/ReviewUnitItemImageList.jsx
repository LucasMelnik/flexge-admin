import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import ImagePreview from '../../../core/layout/ImagePreview';

const ReviewUnitItemImageList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Order',
        path: 'order',
        width: '50px',
      },
      {
        label: 'Group',
        path: 'group',
        width: '100px',
      },
      {
        label: 'Text',
        path: 'item.text',
        width: '23%',
        render: (cell, row) => (
          <div>{row.item.text ? row.item.text : row.item.title}</div>
        ),
      },
      {
        label: 'Translation',
        path: 'item.translation',
        width: '23%',
      },
      {
        label: 'Type',
        path: 'item.type.name',
        width: '10%',
      },
      {
        label: 'Image',
        path: 'item.image',
        render: (cell, row) => {
          if (row.item.image) {
            return (
              <img
                src={`${process.env.REACT_APP_API_URL}/files/${row.item.image}`}
                alt={`for-item-${row.item.id}`}
                style={{
                  width: 'auto',
                  height: 100,
                }}
              />
            );
          } else if (row.item.type.key === 'SINGLE_CHOICE_IMAGE') {
            return (
              <div>
                {row.item.answers.map(answer => (
                  <img
                    key={`for-item-answer-${answer.id}`}
                    src={`${process.env.REACT_APP_API_URL}/files/${answer.image}`}
                    alt={`for-item-answer-${answer.id}`}
                    style={{
                      width: 'auto',
                      height: 50,
                      display: 'inline-block',
                    }}
                  />
                ))}
              </div>
            );
          }
          return 'No image uploaded';
        },
      },
      {
        label: 'Actions',
        path: 'action',
        width: '75',
        render: (cell, row) => {
          if (row.item.image) {
            return (
              <ImagePreview src={row.item.image} />
            );
          }
        },
      },
    ]}
    rows={props.items}
    expandable
    expandableComponent={row => (
      <Table
        columns={[
          {
            label: 'Text',
            path: 'text',
            width: '23%',
          },
          {
            label: 'Image',
            path: 'image',
            render: (cell, row) => {
              if (row.image) {
                return (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/files/${row.image}`}
                    alt={`for-item-${row.id}`}
                    style={{
                      width: 'auto',
                      height: 100,
                    }}
                  />
                );
              }
              return 'No image uploaded';
            },
          },
          {
            label: 'Actions',
            path: 'action',
            width: '75',
            render: (cell, row) => {
              if (row.image) {
                return (
                  <ImagePreview src={row.image} />
                );
              }
            }
          },
        ]}
        rows={row.item.type.key === 'SINGLE_CHOICE_IMAGE' && row.item.answers}
      />
    )}
  />
);


ReviewUnitItemImageList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    item: PropTypes.shape({
      text: PropTypes.string,
      translation: PropTypes.string,
      image: PropTypes.string,
    }),
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default ReviewUnitItemImageList;
