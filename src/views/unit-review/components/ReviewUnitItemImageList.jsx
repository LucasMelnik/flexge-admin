import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import ImagePreview from '../../../core/layout/ImagePreview';
import Async from '../../../core/layout/Async';

const ReviewUnitItemImageList = props => (
  <Async fetching={props.fetching}>
    <Table
      columns={[
        {
          label: 'ID',
          path: 'id',
          isKey: true,
          hidden: true,
        },
        {
          label: 'Text',
          path: 'item.text',
          width: '23%',
          rowColumnStyle: {
            textOverflow: 'none',
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 5,
            whiteSpace: 'normal',
            textAlign: 'justify',
            lineHeight: '18px',
          },
          render: (cell, row) => (
            <div>{row.item.text ? row.item.text : row.item.title}</div>
          ),
        },
        {
          label: 'Translation',
          path: 'item.translation',
          width: '23%',
          rowColumnStyle: {
            textOverflow: 'none',
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 5,
            whiteSpace: 'normal',
            textAlign: 'justify',
            lineHeight: '18px',
          },
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
            }
            return 'No image uploaded';
          }
        },
        {
          label: 'Actions',
          path: 'action',
          width: props.disabled ? '0' : '175',
          render: (cell, row) => {
            if (row.item.image) {
              return (
                <ImagePreview src={row.item.image} />
              );
            }
          }
        },
      ]}
      rows={props.items}
    />
  </Async>
);


ReviewUnitItemImageList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    item: PropTypes.shape({
      text: PropTypes.string,
      translation: PropTypes.string,
      image: PropTypes.string.isRequired,
    }),
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default ReviewUnitItemImageList;
