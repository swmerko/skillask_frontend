import {defaultCenter} from './notification-center';


export class GuiNotifications {

  static get snackBarEvent() {
    return 'snackBar';
  }

  static snackBar(text, actionLabel, actionFunction) {
    defaultCenter.emit(this.snackBarEvent, text, actionLabel, actionFunction);
  }

  static get toastEvent() {
    return 'toast';
  }

  static toast(text) {
    defaultCenter.emit(this.toastEvent, text);
  }
}
