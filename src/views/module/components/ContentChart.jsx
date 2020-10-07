import React from 'react';
import PropTypes from 'prop-types';
import { round } from 'lodash';
import { Pie } from 'react-chartjs-2';
import { Modal } from 'antd';
import head from 'lodash/head';
import get from 'lodash/get';
import Table from '../../../core/form/Table';

class ContentChart extends React.PureComponent {

  handleShowDetails = (event) => {
    const chartElement = head(event);
    const elementIndex = get(chartElement, '_index', -1);
    if (elementIndex >= 0 && this.props.labels[elementIndex] === 'Others') {
      Modal.info({
        okText: 'Close',
        title: 'Details',
        width: 600,
        icon: null,
        content: (
          <Table
            rows={this.props.others.data}
            columns={[
              {
                label: 'Grammar',
                path: 'name',
              },
              {
                label: 'Count',
                path: 'count',
              },
            ]}
          />
        )
      });
    }
  };

  render() {
    return (
      <Pie
        height={200}
        data={{
          labels: this.props.labels,
          datasets: [{
            fill: true,
            backgroundColor: this.props.colors,
            data: this.props.data,
          }],
        }}
        options={{
          responsive: true,
          title: {
            display: true,
            text: this.props.title,
          },
          legend: this.props.legendPosition !== 'null' && {
            position: this.props.legendPosition,
            onClick: () => true,
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0);
                const value = data.datasets[0].data[tooltipItem.index] || 0;
                // if (data.labels[tooltipItem.index] === 'Others') {
                //   return `${data.labels[tooltipItem.index]}: ${value} (${round((value / total) * 100, 2)}%) <br/> ${this.props.others.data.reduce((acc, x) => acc.concat(x.name), '')}`
                // }
                return `${data.labels[tooltipItem.index]}: ${value} (${round((value / total) * 100, 2)}%)`;
              },
            },
          },
          hover: {
            onHover: function (e) {
              const point = this.getElementAtEvent(e);
              if (point.length) e.target.style.cursor = 'pointer';
              else e.target.style.cursor = 'default';
            },
          },
        }}
        onElementsClick={this.handleShowDetails}
      />
    );
  }
}

ContentChart.propTypes = {
  title: PropTypes.string.isRequired,
  legendPosition: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ContentChart;
