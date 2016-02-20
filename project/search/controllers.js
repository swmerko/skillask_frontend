import { BaseLayoutController } from 'outlinejs/controllers';
import { SearchView } from './views';
import { LayoutView } from '../core/views';
import { UserSkillCollection } from './managers';
import { SkillCollection } from '../skills/managers';
import { User } from '../core/models';
import { getAuthCookie } from '../auth/utils';

export class SearchController extends BaseLayoutController {
  static get loginRequired() {
    return false;
  }

  get context() {
    return {
      users: this.users,
      searchString: this.searchString,
      skillsSuggestions: this.skillsSuggestions,
      currentUser: this.currentUser
    };
  }

  init() {
    this.layoutView = LayoutView;
    this.view = SearchView;
    this.currentUser = null;
    this.users = [];
    this.skillsSuggestions = [];
    this.searchString = '';
    this.currentUser = null;

    this.getCurrentUser();

    this.render(this.context);
  }

  getCurrentUser() {
    let bearerToken = getAuthCookie('bearerToken');
    this.currentUser = new User({id: 'current'});
    return this.currentUser.fetch({headers: {Authorization: bearerToken}}).then(() => {
      this.render(this.context);
    });
  }

  getSuggestions(searchString) {
    var skillsSuggestions = new SkillCollection();
    skillsSuggestions.fetch({data: {search: searchString}}).then(() => {
      this.skillsSuggestions = skillsSuggestions;
      this.render(this.context);
    }).catch((err) => {
      console.log(err);
    });
    this.render(this.context);
  }

  search(searchObj) {
    this.searchString = searchObj.name;
    var users = new UserSkillCollection();
    users.fetch({data: {skillId: searchObj.id}}).then(() => {
      this.users = users;
      this.render(this.context);
    }).catch((err) => {
      console.log(err);
    });
    this.render(this.context);
  }
}
