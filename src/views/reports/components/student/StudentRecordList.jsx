import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Table from '../../../../core/form/Table';

const StudentRecordList = props => (
  <div>
    <Table
      fetching={props.fetching}
      columns={[
        {
          label: 'Name',
          path: 'name',
          sort: true,
          defaultSortOrder: 'ascend',
        },
        {
          label: 'Reached Level (PT)',
          path: 'reachedLevel',
        },
        {
          label: 'Time Studied',
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
          label: 'Current Course',
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
                }
                return (
                  <div>Current</div>
                );
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
                }
                return (
                  <div>Current</div>
                );
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
                }
                return (
                  <div>Current</div>
                );
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
                }
                return (
                  <div>Current</div>
                );
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
                }
                return (
                  <div>Current</div>
                );
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
                }
                return (
                  <div>Current</div>
                );
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
                }
                return (
                  <div>Current</div>
                );
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
                }
                return (
                  <div>Current</div>
                );
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
                }
                return (
                  <div>Current</div>
                );
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
                }
                return (
                  <div>Current</div>
                );
              }
              return (
                <div>-</div>
              );
            }
          },
        },
      ]}
      rows={props.students}
      selectable
      onSelect={props.onSelect}
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
