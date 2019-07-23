import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import get from 'lodash/get';
import range from 'lodash/range';
import toInteger from 'lodash/toInteger';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import Avatar from '../../../../core/layout/Avatar';
import Async from '../../../../core/layout/Async';
import ColumnSeparator from '../../../../core/layout/ColumnSeparator';
import Dialog from '../../../../core/layout/Dialog';
import Button from '../../../../core/form/Button';
import Table from '../../../../core/form/Table';
import Star from '../../../../core/images/star-sq.png';
import EmptyStar from '../../../../core/images/empty-star-sq.png';

export default class StudentDetailHeader extends Component {
  static propTypes = {
    student: PropTypes.shape({
      profilePicture: PropTypes.string,
      nickname: PropTypes.string,
      name: PropTypes.string,
      studyQuality: PropTypes.shape({
        score: PropTypes.number,
        requirements: PropTypes.arrayOf(PropTypes.shape({})),
      }),
      currentCourse: PropTypes.shape({
        name: PropTypes.string,
      }),
      schoolClass: PropTypes.shape({
        name: PropTypes.string,
      }),
      academicPlan: PropTypes.shape({
        name: PropTypes.string,
      })
    }).isRequired,
    fetching: PropTypes.bool.isRequired,
  };

  state = { showStudyQualityDetails: false };

  handleToggleStudyQualityDetails = () => {
    this.setState({
      showStudyQualityDetails: !this.state.showStudyQualityDetails,
    });
  };

  getScoreByRequirement = (item) => {
    const getScore = divisor => {
      if (isFinite(item.secondScore) && isFinite(item.thirdScore)) {
        return toInteger(
          ((item.firstScore * 2.5) / divisor) +
          (((item.secondScore || 0) * 1.6) / divisor) +
          (((item.thirdScore || 0) * 0.9) / divisor),
        );
      }
      return toInteger((item.firstScore / divisor) * 5);
    };

    if (
      [
        'DAYS_STUDIED',
        'DAYS_STUDIED_AT_LEAST_30_MINUTES',
        'UNIT_AVERAGE_SCORE',
        'TIME_STUDIED',
      ].find(type => type === item.requirement)
    ) {
      return getScore(3);
    } else if (
      [
        'SINGLE_CHOICE_AVERAGE_SCORE',
        'SPEECH_RECOGNITION_AVERAGE_SCORE',
        'LISTEN_USAGE',
      ].find(type => type === item.requirement)
    ) {
      return getScore(2);
    } else if (item.requirement === 'REPEAT_USAGE') {
      return getScore(4);
    }
    return null;
  };

  render() {
    return (
      <Async fetching={this.props.fetching}>
        <Row>
          <Column size={4}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Avatar
                size="lg"
                src={this.props.student.profilePicture}
              />
              <ColumnSeparator />
              <div>
                <h1 style={{ margin: 0 }}>{this.props.student.name}</h1>
                <h4 style={{ margin: '-8px 0px 0px 0px' }}><i>{this.props.student.nickname}</i></h4>
                <small style={{ margin: '-8px 0px 0px 0px' }}><i>Registered at: {moment(this.props.student.createdAt).format('DD/MM/YYYY')}</i></small>
              </div>
            </div>
          </Column>
          <Column size={2}>
            <div
              style={{
                textAlign: 'center',
              }}
            >
              Study Quality
              <br />
              {(this.props.student.studyQuality && this.props.student.studyQuality.score != null) ? (
                <button
                  onClick={this.handleToggleStudyQualityDetails}
                  style={{
                    outline: 'none',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                    }}
                  >
                    {this.props.student.studyQuality.score.toFixed(0)}
                  </h2>
                </button>
              ) : (
                <h2>not available yet</h2>
              )}
            </div>
          </Column>
          <Column size={2}>
            <div
              style={{
                textAlign: 'center',
              }}
            >
              Course
              <h2>{this.props.student.currentCourse.name}</h2>
            </div>
          </Column>
          <Column size={2}>
            <div
              style={{
                textAlign: 'center',
              }}
            >
              School Class
              <h2>{get(this.props.student, 'schoolClass.name', '')}</h2>
            </div>
          </Column>
          <Column size={2}>
            <div
              style={{
                textAlign: 'center',
              }}
            >
              Academic Plan
              <h2>{get(this.props.student, 'academicPlan.name', '')}</h2>
            </div>
          </Column>
        </Row>
        <Dialog
          width="60%"
          title="Study Quality Detail"
          isOpen={this.state.showStudyQualityDetails}
          onCancel={this.handleToggleStudyQualityDetails}
          actions={[
            <Button
              key="close-button"
              icon="close-circle"
              label="Close"
              onClick={this.handleToggleStudyQualityDetails}
            />,
          ]}
        >
          <Table
            showTableCount={false}
            rows={get(this.props.student, 'studyQuality.requirements', [])}
            columns={[
              {
                label: 'Requirement',
                path: 'requirement',
                render: (type) => {
                  if (type === 'DAYS_STUDIED') {
                    return 'Estudar pelo menos 7 dias a cada 15 dias';
                  } else if (type === 'TIME_STUDIED') {
                    return 'Estudar o tempo semanal exigido';
                  } else if (type === 'DAYS_STUDIED_AT_LEAST_30_MINUTES') {
                    return 'Quando estudar, fazer pelo menos 30 minutos';
                  } else if (type === 'SINGLE_CHOICE_AVERAGE_SCORE') {
                    return 'Acerto das questions';
                  } else if (type === 'UNIT_AVERAGE_SCORE') {
                    return 'Nota média nas units';
                  } else if (type === 'SPEECH_RECOGNITION_AVERAGE_SCORE') {
                    return 'Nota média no Speech Recognition';
                  } else if (type === 'REPEAT_USAGE') {
                    return 'Uso do botão Repetir';
                  } else if (type === 'LISTEN_USAGE') {
                    return 'Uso do botão Escutar';
                  }
                  return '';
                },
              },
              {
                label: 'Score',
                path: 'id',
                width: '250px',
                render: (value, row) => (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flex: 1,
                    }}
                  >
                    {range(5).map((index) => {
                      const score = this.getScoreByRequirement(row);
                      return (
                        <img
                          alt="sq-icon"
                          src={score <= index ? EmptyStar : Star}
                          style={{
                            marginLeft: 10,
                            opacity: score <= index ? 0.3 : 1,
                          }}
                        />
                      );
                    })}
                  </div>
                ),
              },
            ]}
          />
        </Dialog>
      </Async>
    );
  }
}
