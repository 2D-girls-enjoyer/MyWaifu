import { AlertType } from '../enums/alertType';

export interface IAlert {
  type: AlertType;
  message: string;
}
