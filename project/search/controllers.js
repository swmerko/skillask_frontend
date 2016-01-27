import { BaseLayoutController } from 'outlinejs/controllers';
import { SearchContentView } from './views';
import { BaseLayoutView } from '../core/views';
import { UserCollection } from './managers';
import { gettext } from 'outlinejs/utils/translation';

export class MyController extends BaseLayoutController {
  static get loginRequired() {
    return false;
  }

  init() {
    this.layoutView = BaseLayoutView;
    this.view = SearchContentView;
    this.render({ myVar: gettext('Loading users ...') });

    var users = new UserCollection();
    users.fetch().then(() => {
      this.render({ myVar: gettext('Users loaded ...'), users: users });
    }).catch((err) => {
      console.log(err);
    });
  }
}
