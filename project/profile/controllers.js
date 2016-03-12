import { BaseLayoutController } from 'outlinejs/lib/controllers';
import { LayoutView } from '../core/views';
import { ProfileContentView } from './views';
import { gettext } from 'outlinejs/lib/utils/translation';

export class ProfileContoller extends BaseLayoutController {
  static get loginRequired() {
    return false;
  }

  get layoutView() {
    return LayoutView;
  }

  get view() {
    return ProfileContentView;
  }

  get context() {
    return {};
  }

  init() {
    this.render(this.context);
  }

}
