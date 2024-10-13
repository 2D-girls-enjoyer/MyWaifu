import { action, makeObservable, observable } from 'mobx';
import { IAlert } from '../models/interfaces/alert';
import { MAX_ALERT_ON_SCREEN } from '../constants';

class AlertStore {
  alerts: IAlert[] = [];

  constructor() {
    makeObservable(this, {
      alerts: observable,
      addAlert: action,
      removeAlertByIndex: action,
    });
  }

  addAlert(alert: IAlert) {
    if (this.alerts.length === MAX_ALERT_ON_SCREEN) {
      this.alerts.pop();
    }

    this.alerts = [alert, ...this.alerts];
  }

  removeAlertByIndex(index: number) {
    this.alerts.splice(index, 1);
  }
}

export default new AlertStore();
