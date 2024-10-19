import { observer } from 'mobx-react';
import alertStore from '../../store/alertStore';
import { AlertType } from '../../models/enums/alertType';

type AlertResources = {
  headerText: string;
  headerColor: string;
  innerTextColor: string;
  borderColor: string;
  innerColor: string;
};

const AlertStack = observer(() => {
  const renderStack = () => alertStore.alerts.map((alert, index) => {
    let alertResources: AlertResources;

    switch (alert.type) {
      case AlertType.ERROR:
        alertResources = {
          headerText: 'ERROR',
          headerColor: 'bg-red-500',
          innerTextColor: 'text-red-700',
          borderColor: 'border-red-400',
          innerColor: 'bg-red-100',
        };
        break;
      default:
        alertResources = {
          headerText: 'INFO',
          headerColor: 'bg-blue-500',
          innerTextColor: 'text-blue-700',
          borderColor: 'border-blue-400',
          innerColor: 'bg-blue-100',
        };
    }

    return (
      <div key={`alert-${crypto.randomUUID()}`}>
        <div className={`${alertResources.headerColor} flex text-white font-bold px-4 py-2`}>
          <p className="text-xl basis-full">{alertResources.headerText}</p>
          <div
            onClick={() => { alertStore.removeAlertByIndex(index); }}
            className="self-center cursor-pointer text-xl font-extrabold"
          >
            X
          </div>
        </div>
        <div className={`border border-t-0 ${alertResources.borderColor}  ${alertResources.innerColor} px-4 py-3 ${alertResources.innerTextColor}`}>
          <p className="break-words">{alert.message}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="w-full space-y-2">
      {renderStack()}
    </div>
  );
});

export default AlertStack;
