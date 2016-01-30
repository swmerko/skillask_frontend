import { BaseLayoutController } from 'outlinejs/controllers';
import { SearchView } from './views';
import { LayoutView } from '../core/views';
import { UserCollection } from './managers';
import { gettext } from 'outlinejs/utils/translation';

export class SearchController extends BaseLayoutController {
  static get loginRequired() {
    return false;
  }

  get context() {
    return {
      users: this.users,
      searchString: this.searchString
    };
  }

  init() {
    this.layoutView = LayoutView;
    this.view = SearchView;

    this.users = [];
    this.searchString = '';

    this.render(this.context);
  }

  search(searchString) {
    console.log(searchString);
    //this.eventbookConfiguration.coverBinding = code;
    //console.log(this.eventbookConfiguration);
    this.searchString = searchString;
    var users = new UserCollection();
    var filter = {skill_name: searchString}
    users.fetch({data: filter}).then(() => {
      this.users = users;
      this.render(this.context);
    }).catch((err) => {
      console.log(err);
    });
    this.render(this.context);
  }
}
