import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import moment from 'moment';

class StudentRecordListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      schoolId: null,
      classId: null,
      students: [],
      allValues: {},
      totalValues: [],
    });
  }

  init = action((schoolId, classId) => {
    this.schoolId = schoolId;
    this.classId = classId;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/reports/schools/${this.schoolId}/school-classes/${this.classId}/students`,
    }).then(() => {
      if (this.fetch.data) {
        this.students = this.fetch.data;
        this.allValues = Object.assign({
          totalReachedLevel: 0,
          totalTime: 0,
          totalA1: 0,
          totalA1Plus: 0,
          totalA2: 0,
          totalA2Plus: 0,
          totalB1: 0,
          totalB1Plus: 0,
          totalB2: 0,
          totalB2Plus: 0,
          totalC1: 0,
          totalC2: 0,
        });
        const timeStudied = [];
        const totalA1 = [];
        const totalA1Plus = [];
        const totalA2 = [];
        const totalA2Plus = [];
        const totalB1 = [];
        const totalB1Plus = [];
        const totalB2 = [];
        const totalB2Plus = [];
        const totalC1 = [];
        const totalC2 = [];
        this.students.forEach((student) => {
          this.allValues.totalReachedLevel += student.reachedLevel;
          student.studentCourses.forEach((studentCourse) => {
            if (studentCourse.startedAt && studentCourse.completedAt) {
              const startDate = moment(studentCourse.startedAt);
              const completeDate = moment(studentCourse.completedAt);
              const duration = moment.duration(completeDate.diff(startDate));
              timeStudied.push(duration);

              if (studentCourse.course.name === 'A1') {
                const startDateA1 = moment(studentCourse.startedAt);
                const completeDateA1 = moment(studentCourse.completedAt);
                const durationA1 = moment.duration(completeDateA1.diff(startDateA1));
                totalA1.push(durationA1);
              }

              if (studentCourse.course.name === 'A1+') {
                const startDateA1Plus = moment(studentCourse.startedAt);
                const completeDateA1Plus = moment(studentCourse.completedAt);
                const durationA1Plus = moment.duration(completeDateA1Plus.diff(startDateA1Plus));
                totalA1Plus.push(durationA1Plus);
              }

              if (studentCourse.course.name === 'A2') {
                const startDateA2 = moment(studentCourse.startedAt);
                const completeDateA2 = moment(studentCourse.completedAt);
                const durationA2 = moment.duration(completeDateA2.diff(startDateA2));
                totalA2.push(durationA2);
              }

              if (studentCourse.course.name === 'A2+') {
                const startDateA2Plus = moment(studentCourse.startedAt);
                const completeDateA2Plus = moment(studentCourse.completedAt);
                const durationA2Plus = moment.duration(completeDateA2Plus.diff(startDateA2Plus));
                totalA2Plus.push(durationA2Plus);
              }

              if (studentCourse.course.name === 'B1') {
                const startDateB1 = moment(studentCourse.startedAt);
                const completeDateB1 = moment(studentCourse.completedAt);
                const durationB1 = moment.duration(completeDateB1.diff(startDateB1));
                totalB1.push(durationB1);
              }

              if (studentCourse.course.name === 'B1+') {
                const startDateB1Plus = moment(studentCourse.startedAt);
                const completeDateB1Plus = moment(studentCourse.completedAt);
                const durationB1Plus = moment.duration(completeDateB1Plus.diff(startDateB1Plus));
                totalB1Plus.push(durationB1Plus);
              }

              if (studentCourse.course.name === 'B2') {
                const startDateB2 = moment(studentCourse.startedAt);
                const completeDateB2 = moment(studentCourse.completedAt);
                const durationB2 = moment.duration(completeDateB2.diff(startDateB2));
                totalB2.push(durationB2);
              }

              if (studentCourse.course.name === 'B2+') {
                const startDateB2Plus = moment(studentCourse.startedAt);
                const completeDateB2Plus = moment(studentCourse.completedAt);
                const durationB2Plus = moment.duration(completeDateB2Plus.diff(startDateB2Plus));
                totalB2Plus.push(durationB2Plus);
              }

              if (studentCourse.course.name === 'C1') {
                const startDateC1 = moment(studentCourse.startedAt);
                const completeDateC1 = moment(studentCourse.completedAt);
                const durationC1 = moment.duration(completeDateC1.diff(startDateC1));
                totalC1.push(durationC1);
              }

              if (studentCourse.course.name === 'C2') {
                const startDateC2 = moment(studentCourse.startedAt);
                const completeDateC2 = moment(studentCourse.completedAt);
                const durationC2 = moment.duration(completeDateC2.diff(startDateC2));
                totalC2.push(durationC2);
              }
            }
          });
        });

        timeStudied.forEach((duration) => {
          this.allValues.totalTime += duration.as('milliseconds');
        });

        totalA1.forEach((duration) => {
          this.allValues.totalA1 += duration.as('milliseconds');
        });

        totalA1Plus.forEach((duration) => {
          this.allValues.totalA1Plus += duration.as('milliseconds');
        });

        totalA2.forEach((duration) => {
          this.allValues.totalA2 += duration.as('milliseconds');
        });

        totalA2Plus.forEach((duration) => {
          this.allValues.totalA2Plus += duration.as('milliseconds');
        });

        totalB1.forEach((duration) => {
          this.allValues.totalB1 += duration.as('milliseconds');
        });

        totalB1Plus.forEach((duration) => {
          this.allValues.totalB1Plus += duration.as('milliseconds');
        });

        totalB2.forEach((duration) => {
          this.allValues.totalB2 += duration.as('milliseconds');
        });

        totalB2Plus.forEach((duration) => {
          this.allValues.totalB2Plus += duration.as('milliseconds');
        });

        totalC1.forEach((duration) => {
          this.allValues.totalC1 += duration.as('milliseconds');
        });

        totalC2.forEach((duration) => {
          this.allValues.totalC2 += duration.as('milliseconds');
        });

        this.allValues.totalTime = this.allValues.totalTime / this.students.length;
        this.allValues.totalA1 = this.allValues.totalA1 / this.students.length;
        this.allValues.totalA1Plus = this.allValues.totalA1Plus / this.students.length;
        this.allValues.totalA2 = this.allValues.totalA2 / this.students.length;
        this.allValues.totalA2Plus = this.allValues.totalA2Plus / this.students.length;
        this.allValues.totalB1 = this.allValues.totalB1 / this.students.length;
        this.allValues.totalB1Plus = this.allValues.totalB1Plus / this.students.length;
        this.allValues.totalB2 = this.allValues.totalB2 / this.students.length;
        this.allValues.totalB2Plus = this.allValues.totalB2Plus / this.students.length;
        this.allValues.totalC1 = this.allValues.totalC1 / this.students.length;
        this.allValues.totalC2 = this.allValues.totalC2 / this.students.length;
        this.allValues.totalReachedLevel = this.allValues.totalReachedLevel / this.students.length;
        this.totalValues.push(this.allValues);
      } else {
        this.students = [];
      }
    });
  });
}

const studentRecordListService = new StudentRecordListService();

export default studentRecordListService;
