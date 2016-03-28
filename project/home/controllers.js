import { BaseLayoutController } from 'outlinejs/lib/controllers';
import { AnimatedHomeView } from './views';
import { MaterialLayoutView } from '../core/views';

export class MyController extends BaseLayoutController {
  static get loginRequired() {
    return false;
  }

  get layoutView() {
    return MaterialLayoutView;
  }

  get view() {
    return AnimatedHomeView;
  }

  init() {
    this.render({isHome: true});
  }
}
