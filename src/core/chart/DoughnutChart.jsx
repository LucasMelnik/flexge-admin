import React from 'react';
import PropTypes from 'prop-types';
import head from 'lodash/head';
import get from 'lodash/get';
import { Doughnut } from 'react-chartjs-2';
import Dialog from '../layout/Dialog';
import Table from '../form/Table';
import Button from '../form/Button';

const hexToRgb = (hex, opacity) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ?
    `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})`
    : null;
};

class DoughnutChart extends React.Component {
  state = {
    showDetails: false,
    chartDetails: [],
    title: '',
  };

  handleShowDetails = (event) => {
    const chartElement = head(event);
    if (get(chartElement, '_index', -1) >= 0) {
      this.setState({
        chartDetails: get(this.props.data[get(chartElement, '_index')], 'details', []),
        showDetails: true,
        title: this.props.labels[get(chartElement, '_index')],
      });
    }
  };

  handleCloseDetails = () => {
    this.setState({
      chartDetails: [],
      showDetails: false,
      title: '',
    });
  };

  render() {
    return (
      <div>
        <Doughnut
          data={{
            labels: this.props.labels,
            datasets: [{
              fill: true,
              backgroundColor: this.props.colors.map(color => hexToRgb(color, 0.7)),
              data: this.props.data.map(data => data.rate),
            }],
          }}
          options={{
            responsive: true,
            legend: {
              position: 'right',
              onClick: () => true,
            },
            tooltips: {
              callbacks: this.props.tooltipsCallbacks || {
                label: (tooltipItem, data) => {
                  const rate = data.datasets[0].data[tooltipItem.index] || 0;
                  return `${data.labels[tooltipItem.index]}: ${rate.toFixed(1)}% (${this.props.data[tooltipItem.index].value} students)`;
                },
              },
            },
          }}
          onElementsClick={this.handleShowDetails}
        />
        <Dialog
          title={`Details - ${this.state.title}`}
          actions={<Button onClick={this.handleCloseDetails} label="Close" icon="close" />}
          isOpen={this.state.showDetails}
          onCancel={this.handleCloseDetails}
        >
          <Table
            rows={this.state.chartDetails}
            columns={
              [
                {
                  label: 'Student',
                  path: 'name',
                  sort: true,
                },
                {
                  label: 'Value',
                  path: 'value',
                  defaultSortOrder: 'ascend',
                  sort: true,
                },
              ]
            }
          />
        </Dialog>
      </div>
    );
  }
}

DoughnutChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  tooltipsCallbacks: PropTypes.object,
};

DoughnutChart.defaultProps = {
  tooltipsCallbacks: null,
  data: [],
};

export default DoughnutChart;
