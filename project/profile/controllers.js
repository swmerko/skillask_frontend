import { BaseLayoutController } from 'outlinejs/lib/controllers';
import { MaterialLayoutView } from '../core/views';
import { ProfileContentView } from './views';

import { globalContext } from '../global';

export class ProfileContoller extends BaseLayoutController {
  static get loginRequired() {
    return false;
  }

  get layoutView() {
    return MaterialLayoutView;
  }

  get view() {
    return ProfileContentView;
  }

  get context() {
    return {
      userSkills: this.userSkills
    };
  }

  init() {
    let globalContextObject = globalContext.context.toObject();
    if (globalContextObject.userSkills) {
      this.userSkills = globalContextObject.userSkills;
    } else {
      this.userSkills = [];
    }
    this.render(this.context);
  }

}
