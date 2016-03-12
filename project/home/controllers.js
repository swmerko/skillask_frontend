import { BaseLayoutController } from 'outlinejs/lib/controllers';
import { HomeView } from './views';
import { LayoutView } from '../core/views';

export class MyController extends BaseLayoutController {
  static get loginRequired() {
    return false;
  }

  get layoutView() {
    return LayoutView;
  }

  get view() {
    return HomeView;
  }

  init() {
    this.render({});
  }
}
