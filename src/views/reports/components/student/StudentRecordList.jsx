import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Table from '../../../../core-ant/Table';
import Separator from '../../../../core/layout/Separator';

const StudentRecordList = props => (
  <div>
    <Table
      fetching={props.fetching}
      columns={[
        {
          label: 'Name',
          path: 'name',
          sort: true,
        },
        {
          label: 'Nível inicial (PT)',
          path: 'reachedLevel',
        },
        {
          label: 'Tempo de estudo',
          render: (cell, row) => {
            if (row.studentCourses) {
              const timeStudied = [];
              row.studentCourses.forEach((studentCourse) => {
                if (studentCourse.startedAt && studentCourse.completedAt) {
                  const startDate = moment(studentCourse.startedAt);
                  const completeDate = moment(studentCourse.completedAt);
                  const duration = moment.duration(completeDate.diff(startDate));
                  timeStudied.push(duration);
                }
              });

              let allTime = 0;
              if (timeStudied.length) {
                timeStudied.forEach((duration) => {
                  allTime += duration.as('milliseconds');
                });
              }

              const hours = Math.floor(moment.duration(allTime).asHours());
              const minutes = Math.floor(moment.duration(allTime).asMinutes()) - (hours * 60);

              return (
                <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
              );
            }

            return (
              <div>Teste</div>
            );
          },
        },
        {
          label: 'Last time studied',
          path: 'lastStudentAccess',
          render: (cell, row) => {
            if (row.lastStudentAccess) {
              const now = moment();
              const lastStudentAccess = moment(row.lastStudentAccess);
              const diff = moment.duration(now.diff(lastStudentAccess));
              return (
                <div>{diff.days()} days ago</div>
              );
            }
            return (
              <div>-</div>
            );
          },
        },
        {
          label: 'Actual course',
          render: (cell, row) => {
            if (row.studentCourses) {
              if (row.studentCourses.find(studentCourse => !studentCourse.completedAt)) {
                return (
                  <div>{row.studentCourses.find(studentCourse =>
                    !studentCourse.completedAt).course.name}</div>
                );
              }
              return (
                <div>-</div>
              );
            }
          },
        },
        {
          label: 'A1',
          render: (cell, row) => {
            if (row.studentCourses) {
              if (row.studentCourses.find(studentCourse => studentCourse.course.name === 'A1')) {
                if (row.studentCourses.find(studentCourse => studentCourse.course.name === 'A1').completedAt) {
                  const startDate = moment(row.studentCourses.find(studentCourse => studentCourse.course.name === 'A1').startedAt);
                  const completeDate = moment(row.studentCourses.find(studentCourse => studentCourse.course.name === 'A1').completedAt);
                  const duration = moment.duration(completeDate.diff(startDate));
                  const hours = parseInt(duration.asHours(), 10);
                  const minutes = parseInt(duration.asMinutes(), 10) - (hours * 60);
                  return (
                    <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
                  );
                } else {
                  return (
                    <div>Current</div>
                  );
                }
              }
              return (
                <div>-</div>
              );
            }
          },
        },
        {
          label: 'A1+',
          render: (cell, row) => {
            if (row.studentCourses) {
              if (row.studentCourses.find(studentCourse => studentCourse.course.name === 'A1+')) {
                if (row.studentCourses.find(studentCourse => studentCourse.course.name === 'A1+').completedAt) {
                  const startDate = moment(row.studentCourses.find(studentCourse => studentCourse.course.name === 'A1+').startedAt);
                  const completeDate = moment(row.studentCourses.find(studentCourse => studentCourse.course.name === 'A1+').completedAt);
                  const duration = moment.duration(completeDate.diff(startDate));
                  const hours = parseInt(duration.asHours(), 10);
                  const minutes = parseInt(duration.asMinutes(), 10) - (hours * 60);
                  return (
                    <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
                  );
                } else {
                  return (
                    <div>Current</div>
                  );
                }
              }
              return (
                <div>-</div>
              );
            }
          },
        },
        {
          label: 'A2',
          render: (cell, row) => {
            if (row.studentCourses) {
              if (row.studentCourses.find(studentCourse => studentCourse.course.name === 'A2')) {
                if (row.studentCourses.find(studentCourse => studentCourse.course.name === 'A2').completedAt) {
                  const startDate = moment(row.studentCourses.find(studentCourse => studentCourse.course.name === 'A2').startedAt);
                  const completeDate = moment(row.studentCourses.find(studentCourse => studentCourse.course.name === 'A2').completedAt);
                  const duration = moment.duration(completeDate.diff(startDate));
                  const hours = parseInt(duration.asHours(), 10);
                  const minutes = parseInt(duration.asMinutes(), 10) - (hours * 60);
                  return (
                    <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
                  );
                } else {
                  return (
                    <div>Current</div>
                  );
                }
              }
              return (
                <div>-</div>
              );
            }
          },
        },
        {
          label: 'A2+',
          render: (cell, row) => {
            if (row.studentCourses) {
              if (row.studentCourses.find(studentCourse => studentCourse.course.name === 'A2+')) {
                if (row.studentCourses.find(studentCourse => studentCourse.course.name === 'A2+').completedAt) {
                  const startDate = moment(row.studentCourses.find(studentCourse => studentCourse.course.name === 'A2+').startedAt);
                  const completeDate = moment(row.studentCourses.find(studentCourse => studentCourse.course.name === 'A2+').completedAt);
                  const duration = moment.duration(completeDate.diff(startDate));
                  const hours = parseInt(duration.asHours(), 10);
                  const minutes = parseInt(duration.asMinutes(), 10) - (hours * 60);
                  return (
                    <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
                  );
                } else {
                  return (
                    <div>Current</div>
                  );
                }
              }
              return (
                <div>-</div>
              );
            }
          },
        },
        {
          label: 'B1',
          render: (cell, row) => {
            if (row.studentCourses) {
              if (row.studentCourses.find(studentCourse => studentCourse.course.name === 'B1')) {
                if (row.studentCourses.find(studentCourse => studentCourse.course.name === 'B1').completedAt) {
                  const startDate = moment(row.studentCourses.find(studentCourse => studentCourse.course.name === 'B1').startedAt);
                  const completeDate = moment(row.studentCourses.find(studentCourse => studentCourse.course.name === 'B1').completedAt);
                  const duration = moment.duration(completeDate.diff(startDate));
                  const hours = parseInt(duration.asHours(), 10);
                  const minutes = parseInt(duration.asMinutes(), 10) - (hours * 60);
                  return (
                    <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
                  );
                } else {
                  return (
                    <div>Current</div>
                  );
                }
              }
              return (
                <div>-</div>
              );
            }
          },
        },
        {
          label: 'B1+',
          render: (cell, row) => {
            if (row.studentCourses) {
              if (row.studentCourses.find(studentCourse => studentCourse.course.name === 'B1+')) {
                if (row.studentCourses.find(studentCourse => studentCourse.course.name === 'B1+').completedAt) {
                  const startDate = moment(row.studentCourses.find(studentCourse => studentCourse.course.name === 'B1+').startedAt);
                  const completeDate = moment(row.studentCourses.find(studentCourse => studentCourse.course.name === 'B1+').completedAt);
                  const duration = moment.duration(completeDate.diff(startDate));
                  const hours = parseInt(duration.asHours(), 10);
                  const minutes = parseInt(duration.asMinutes(), 10) - (hours * 60);
                  return (
                    <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
                  );
                } else {
                  return (
                    <div>Current</div>
                  );
                }
              }
              return (
                <div>-</div>
              );
            }
          },
        },
        {
          label: 'B2',
          render: (cell, row) => {
            if (row.studentCourses) {
              if (row.studentCourses.find(studentCourse => studentCourse.course.name === 'B2')) {
                if (row.studentCourses.find(studentCourse => studentCourse.course.name === 'B2').completedAt) {
                  const startDate = moment(row.studentCourses.find(studentCourse => studentCourse.course.name === 'B2').startedAt);
                  const completeDate = moment(row.studentCourses.find(studentCourse => studentCourse.course.name === 'B2').completedAt);
                  const duration = moment.duration(completeDate.diff(startDate));
                  const hours = parseInt(duration.asHours(), 10);
                  const minutes = parseInt(duration.asMinutes(), 10) - (hours * 60);
                  return (
                    <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
                  );
                } else {
                  return (
                    <div>Current</div>
                  );
                }
              }
              return (
                <div>-</div>
              );
            }
          },
        },
        {
          label: 'B2+',
          render: (cell, row) => {
            if (row.studentCourses) {
              if (row.studentCourses.find(studentCourse => studentCourse.course.name === 'B2+')) {
                if (row.studentCourses.find(studentCourse => studentCourse.course.name === 'B2+').completedAt) {
                  const startDate = moment(row.studentCourses.find(studentCourse => studentCourse.course.name === 'B2+').startedAt);
                  const completeDate = moment(row.studentCourses.find(studentCourse => studentCourse.course.name === 'B2+').completedAt);
                  const duration = moment.duration(completeDate.diff(startDate));
                  const hours = parseInt(duration.asHours(), 10);
                  const minutes = parseInt(duration.asMinutes(), 10) - (hours * 60);
                  return (
                    <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
                  );
                } else {
                  return (
                    <div>Current</div>
                  );
                }
              }
              return (
                <div>-</div>
              );
            }
          },
        },
        {
          label: 'C1',
          render: (cell, row) => {
            if (row.studentCourses) {
              if (row.studentCourses.find(studentCourse => studentCourse.course.name === 'C1')) {
                if (row.studentCourses.find(studentCourse => studentCourse.course.name === 'C1').completedAt) {
                  const startDate = moment(row.studentCourses.find(studentCourse => studentCourse.course.name === 'C1').startedAt);
                  const completeDate = moment(row.studentCourses.find(studentCourse => studentCourse.course.name === 'C1').completedAt);
                  const duration = moment.duration(completeDate.diff(startDate));
                  const hours = parseInt(duration.asHours(), 10);
                  const minutes = parseInt(duration.asMinutes(), 10) - (hours * 60);
                  return (
                    <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
                  );
                } else {
                  return (
                    <div>Current</div>
                  );
                }
              }
              return (
                <div>-</div>
              );
            }
          },
        },
        {
          label: 'C2',
          render: (cell, row) => {
            if (row.studentCourses) {
              if (row.studentCourses.find(studentCourse => studentCourse.course.name === 'C2')) {
                if (row.studentCourses.find(studentCourse => studentCourse.course.name === 'C2').completedAt) {
                  const startDate = moment(row.studentCourses.find(studentCourse => studentCourse.course.name === 'C2').startedAt);
                  const completeDate = moment(row.studentCourses.find(studentCourse => studentCourse.course.name === 'C2').completedAt);
                  const duration = moment.duration(completeDate.diff(startDate));
                  const hours = parseInt(duration.asHours(), 10);
                  const minutes = parseInt(duration.asMinutes(), 10) - (hours * 60);
                  return (
                    <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
                  );
                } else {
                  return (
                    <div>Current</div>
                  );
                }
              }
              return (
                <div>-</div>
              );
            }
          },
        },
      ]}
      dataSource={props.students}
      onSelect={props.onSelect}
    />
    <Separator />
    <div>Total</div>
    <Separator />
    <Table
      fetching={props.fetching}
      columns={[
        {
          label: 'Reached level',
          path: 'totalReachedLevel',
        },
        {
          label: 'Time studied',
          render: (cell, row) => {
            const hours = Math.floor(moment.duration(row.totalTime).asHours());
            const minutes = Math.floor(moment.duration(row.totalTime).asMinutes()) - (hours * 60);

            return (
              <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
            );
          },
        },
        {
          label: 'Time A1',
          render: (cell, row) => {
            const hours = Math.floor(moment.duration(row.totalA1).asHours());
            const minutes = Math.floor(moment.duration(row.totalA1).asMinutes()) - (hours * 60);

            return (
              <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
            );
          },
        },
        {
          label: 'Time A1+',
          render: (cell, row) => {
            const hours = Math.floor(moment.duration(row.totalA1Plus).asHours());
            const minutes = Math.floor(moment.duration(row.totalA1Plus).asMinutes()) - (hours * 60);

            return (
              <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
            );
          },
        },
        {
          label: 'Time A2',
          render: (cell, row) => {
            const hours = Math.floor(moment.duration(row.totalA2).asHours());
            const minutes = Math.floor(moment.duration(row.totalA2).asMinutes()) - (hours * 60);

            return (
              <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
            );
          },
        },
        {
          label: 'Time A2+',
          render: (cell, row) => {
            const hours = Math.floor(moment.duration(row.totalA2Plus).asHours());
            const minutes = Math.floor(moment.duration(row.totalA2Plus).asMinutes()) - (hours * 60);

            return (
              <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
            );
          },
        },
        {
          label: 'Time B1',
          render: (cell, row) => {
            const hours = Math.floor(moment.duration(row.totalB1).asHours());
            const minutes = Math.floor(moment.duration(row.totalB1).asMinutes()) - (hours * 60);

            return (
              <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
            );
          },
        },
        {
          label: 'Time B1+',
          render: (cell, row) => {
            const hours = Math.floor(moment.duration(row.totalB1Plus).asHours());
            const minutes = Math.floor(moment.duration(row.totalB1Plus).asMinutes()) - (hours * 60);

            return (
              <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
            );
          },
        },
        {
          label: 'Time B2',
          render: (cell, row) => {
            const hours = Math.floor(moment.duration(row.totalB2).asHours());
            const minutes = Math.floor(moment.duration(row.totalB2).asMinutes()) - (hours * 60);

            return (
              <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
            );
          },
        },
        {
          label: 'Time B2+',
          render: (cell, row) => {
            const hours = Math.floor(moment.duration(row.totalB2Plus).asHours());
            const minutes = Math.floor(moment.duration(row.totalB2Plus).asMinutes()) - (hours * 60);

            return (
              <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
            );
          },
        },
        {
          label: 'Time C1',
          render: (cell, row) => {
            const hours = Math.floor(moment.duration(row.totalC1).asHours());
            const minutes = Math.floor(moment.duration(row.totalC1).asMinutes()) - (hours * 60);

            return (
              <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
            );
          },
        },
        {
          label: 'Time C2',
          render: (cell, row) => {
            const hours = Math.floor(moment.duration(row.totalC2Plus).asHours());
            const minutes = Math.floor(moment.duration(row.totalC2Plus).asMinutes()) - (hours * 60);

            return (
              <div>{hours}:{minutes === 0 ? '00' : minutes}</div>
            );
          },
        },
      ]}
      dataSource={props.totalValues}
    />
  </div>
);

StudentRecordList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default StudentRecordList;
