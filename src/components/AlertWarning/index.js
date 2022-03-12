import { useState } from 'react';
import done from '../../assets/done-icon.svg';
import close from '../../assets/alert-warning-close.svg';
import style from './styles.module.scss';

// Show alert será true quando uma tarefa for executada sem erros

function AlertWarning({ message }) {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div>
      {showAlert
      && (

        <div className={style.container}>
          <div className={style.alertMessage}>
            <img src={done} alt="Sucesso" />
            <p>
              <strong>
                Cuidado!
              </strong>
              <span>{message}</span>
            </p>
          </div>
          <div
            className={style.close}
            onClick={() => setShowAlert(false)}
          >
            <img
              src={close}
              alt="close"
            />

          </div>
        </div>

      )}
    </div>
  );
}

export default AlertWarning;
