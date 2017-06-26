import { action, extendObservable } from 'mobx';
import FormService from '../../../core/services/FormService';
import DifficultyLevelAmountsListService from './DifficultyLevelAmountsListService';
import TimeAmountsListService from './TimeAmountsListService';
import ScoreToPassAmountsListService from './ScoreToPassAmountsListService';
import UnitTypeAmountsListService from './UnitTypeAmountsListService';

class DashboardFilterFormService {
  form = new FormService();

  constructor() {
    extendObservable(this);
  }
  
  onChange = action((path, course) => {
    this.form.setValue(path, course || {});

    if (course && course.id) {
      DifficultyLevelAmountsListService.load(course.id);
      TimeAmountsListService.load(course.id);
      ScoreToPassAmountsListService.load(course.id);
      UnitTypeAmountsListService.load(course.id);
    }
  });
}

const dashboardFilterFormService = new DashboardFilterFormService();

export default dashboardFilterFormService;
