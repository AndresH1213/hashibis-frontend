import { toast } from 'react-toastify';

type position =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

type Props = {
  message: string;
  position?: position;
  autoClose?: number | false;
  hideProgressBar?: boolean;
  progress?: string | number;
  theme?: 'light' | 'dark' | 'colored';
  type?: 'info' | 'success' | 'warning' | 'error' | 'default';
};

class Notification {
  constructor(public params: Props) {}

  public notificate(msg?: string) {
    toast(msg || this.params.message, {
      position: this.params.position || 'top-right',
      autoClose: this.params.autoClose || 2500,
      hideProgressBar: false,
      progress: this.params.progress,
      theme: this.params.theme || 'light',
      type: this.params.type || 'default',
    });
  }
}

export default Notification;
