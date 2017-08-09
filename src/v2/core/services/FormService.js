import { extendObservable, computed, action, toJS } from 'mobx'
import find from 'lodash/find'
import get from 'lodash/get'
import set from 'lodash/set'

class FormService {
  constructor() {
    extendObservable(this, {
      values: {},
      initialValues: null,
      dirtyValues: [],
      validations: {},
      // TODO: improve readability
      errors: computed(() => {
        const errors = Object.keys(this.validations).reduce((result, path) => {
          if (!this.isDirty(path) && !this.submitted) {
            return result
          }
          const validations = get(this.validations, path).map(validation => validation(this.getValue(path), this.getValues()))
          const error = find(validations, error => error)
          if (!error) {
            return result
          }
          return set(result, path, error);
        }, {})
        if (!Object.keys(errors).length) {
          return null
        }
        return errors
      }),
      submitted: false
    })
  }

  getValues = () => {
    return toJS(this.values)
  }

  getValue = path => {
    return get(this.values, path, '')
  }

  isDirty = path => {
    return path ? this.dirtyValues.filter(dirtyValue => dirtyValue === path).length > 0 : this.dirtyValues.length > 0;
  }

  setInitialValues = action((values) => {
    this.initialValues = values;
    this.values = values;
  })

  setValue = action((path, value) => {
    const values = { ...this.values };
    const newValues = set(values, path, value);
    this.values = newValues;
    this.setDirty(path);
  })

  setDirty = action((path) => {
    if (this.isDirty(path)) {
      return;
    }
    const nextDirtyValues = [...this.dirtyValues, path];
    this.dirtyValues = nextDirtyValues;
  })

  setPristine = action((path) => {
    if (!this.isDirty(path)) {
      return;
    }
    const nextDirtyValues = this.dirtyValues.filter(dirtyValue => dirtyValue !== path);
    this.dirtyValues = nextDirtyValues;
  })

  setSubmitted = action(() => {
    this.submitted = true;
  })

  reset = action(() => {
    this.values = this.initialValues || {};
    this.dirtyValues = [];
    this.submitted = false;
  })
}

export default FormService;
