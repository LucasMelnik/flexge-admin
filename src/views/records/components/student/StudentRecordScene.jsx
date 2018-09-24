import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../../core/layout/Card';
import Breadcrumb from '../../../../core/layout/Breadcrumb';
import StudentRecordListContainer from './StudentRecordListContainer';
import Separator from '../../../../core/layout/Separator';
import Tabs from '../../../../core/layout/Tabs';
import GrammarNeedsListContainer from '../common/GrammarNeedsListContainer';
import StudentRecordPerformance from './StudentRecordPerformance';
import StudiedGrammarListContainer from '../common/StudiedGrammarListContainer';
import StudentGradeListContainer from './StudentGradeListContainer';

const StudentRecordScene = props => (
  <div>
    <Breadcrumb
      fetching={props.fetching}
      crumbs={[
        {
          text: 'Records',
          link: '/records/filters',
        },
        {
          text: props.school.name,
          link: `/records/schools/${props.school.id}/classes`,
        },
        {
          text: props.class.name,
        },
      ]}
    />
    <Tabs
      tabs={[
        {
          title: 'Analytics',
          content: (
            <div>
              <Card title="Performance Goals">
                <StudentRecordPerformance
                  schoolId={props.schoolId}
                  classId={props.classId}
                />
              </Card>
              <Separator />
              <Card
                title="Grammar Needs"
                fetching={props.fetching}
              >
                <GrammarNeedsListContainer
                  schoolId={props.schoolId}
                  classId={props.classId}
                />
              </Card>
            </div>
          ),
        },
        {
          title: 'Students Records',
          content: (
            <Card
              fetching={props.fetching}
            >
              <StudentRecordListContainer
                schoolId={props.schoolId}
                classId={props.classId}
              />
            </Card>
          ),
        },
        {
          title: 'Students Grades',
          content: (
            <Card
              fetching={props.fetching}
            >
              <StudentGradeListContainer
                schoolId={props.schoolId}
                classId={props.classId}
              />
            </Card>
          ),
        },
        {
          title: 'Studied Grammars - last 60 days',
          content: (
            <Card
              fetching={props.fetching}
            >
              <StudiedGrammarListContainer
                schoolId={props.schoolId}
                classId={props.classId}
              />
            </Card>
          ),
        },
      ]}
    />
  </div>
);

StudentRecordScene.propTypes = {
  schoolId: PropTypes.string.isRequired,
  classId: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  school: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  class: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

StudentRecordScene.defaultProps = {
  school: {},
  class: {},
};

export default StudentRecordScene;
