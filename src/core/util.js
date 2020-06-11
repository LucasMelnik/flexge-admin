import moment from 'moment';
import 'moment-duration-format';

export const formatTimeFromSeconds = (time, format = 'mm:ss') => moment.duration(time, 'seconds').format(format, { trim: false });

export const Roles = {
  ADMIN: 'ADMIN',
  SUPPORT: 'SUPPORT',
  DISTRIBUTOR_MANAGER: 'DISTRIBUTOR_MANAGER',
  COMPANY_MANAGER: 'COMPANY_MANAGER',
  SCHOOL_MANAGER: 'SCHOOL_MANAGER',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
  PARENT: 'PARENT',
  CONTENT_ADMIN: 'CONTENT_ADMIN',
  AUDIO_CONTENT: 'AUDIO_CONTENT',
  IMAGE_ADMIN: 'IMAGE_ADMIN',
  CERTIFICATION_TEST_PROFESSIONAL: 'CERTIFICATION_TEST_PROFESSIONAL',
  SPEECHACE: 'SPEECHACE'
};