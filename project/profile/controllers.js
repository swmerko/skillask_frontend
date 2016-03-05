import { BaseLayoutController } from 'outlinejs/controllers';
import { ProfileView, AddSkillView } from './views';
import { LayoutView } from '../core/views';
import { User } from '../core/models';
import { UserSkillCollection } from '../search/managers';
import { SkillCollection } from '../skills/managers';
import { UserSkill } from '../search/models';
//import { queryString } from 'query-string';
import { getAuthCookie } from '../auth/utils';

export class ProfileController extends BaseLayoutController {
  static get loginRequired() {
    return false;
  }

  get context() {
    return {
      currentUser: this.currentUser
    };
  }

  getCurrentUser() {
    let bearerToken = getAuthCookie('bearerToken');
    this.currentUser = new User({id: 'current'});
    return this.currentUser.fetch({headers: {Authorization: bearerToken}}).then(() => {
      this.render(this.context);
    });
  }


  get layoutView() {
    return LayoutView;
  }

  get view() {
    return ProfileView;
  }

  init() {
    this.currentUser = null;
    this.getCurrentUser();
    //this.render(this.context);
  }
}

export class AddSkillsProfileController extends BaseLayoutController {
  static get loginRequired() {
    return false;
  }

  get layoutView() {
    return LayoutView
  }

  get view() {
    return AddSkillView
  }

  get context() {
    return {
      currentUser: this.currentUser,
      userSkills: this.userSkills,
      //autocompleteSkills: this.autocompleteSkills,
      suggestionsSkills: this.suggestionsSkills
    };
  }

  init() {
    this.currentUser = null;
    this.userSkills = [];
    //this.autocompleteSkills = [];
    this.suggestionsSkills = [];
    this.getCurrentUser();
    //this.getUserSkills();
    this.render(this.context);
  }

  getCurrentUser() {
    let bearerToken = getAuthCookie('bearerToken');
    this.currentUser = new User({id: 'current'});
    return this.currentUser.fetch({headers: {Authorization: bearerToken}}).then(() => {
      this.render(this.context);
      this.getUserSkills();
    });
  }

  addUserSkill(skillId, userId = this.currentUser.pk) {
    var userSkill = new UserSkill();
    let skillData = {skill: skillId, user: userId};
    let bearerToken = getAuthCookie('bearerToken');
    userSkill.save(skillData, {
      headers: {Authorization: bearerToken}
    }).then(() => {
      this.getUserSkills();
      this.render(this.context);
    }).catch((err) => {
      console.log(err);
    });
    this.render(this.context);
  }

  removeUserSkill(userSkillId) {
    var userSkill = new UserSkill({id: userSkillId});
    let bearerToken = getAuthCookie('bearerToken');
    userSkill.destroy({
      headers: {Authorization: bearerToken}
    }).then(() => {
      this.getUserSkills();
      this.render(this.context);
    }).catch((err) => {
      console.log(err);
    });
    this.render(this.context);
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

  getUserSkills(userId = this.currentUser.pk) {
    let bearerToken = getAuthCookie('bearerToken');

    var userSkills = new UserSkillCollection();
    userSkills.fetch({
      data: {userId: userId},
      headers: {Authorization: bearerToken}
    }).then(() => {
      this.userSkills = userSkills;
      this.render(this.context);
    }).catch((err) => {
      console.log(err);
    });
  }


}
