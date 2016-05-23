import {defaultCenter} from './notification-center';


export class GuiNotifications {

  static get snackBarEvent() {
    return 'snackBar';
  }

  static snackBar(text) {
    defaultCenter.emit(this.snackBarEvent, text);
  }

  static get toastEvent() {
    return 'toast';
  }

  static toast(text) {
    defaultCenter.emit(this.toastEvent, text);
  }
}
