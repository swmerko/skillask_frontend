import { BaseLayoutController } from 'outlinejs/controllers';
import { ProfileView, AddSkillView } from './views';
import { LayoutView } from '../core/views';
import { User } from '../core/models';
import { UserSkillCollection } from '../search/managers';
import { SkillCollection } from '../skills/managers';
import { UserSkill } from '../search/models';
//import { queryString } from 'query-string';
const queryString = require('query-string');


const setAuthCookie = function (cname, cvalue, exdays, domain, path = '/') {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = `;expires=${d.toUTCString()}`;
  let authCookie = `${cname}=${cvalue}${expires}`;
  if (domain) {
    authCookie += `;domain=${domain};path=${path}`;
  }
  document.cookie = authCookie;
};

const getAuthCookie = function (cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  console.error('Token.getAuthCookie()', 'auth cookie not found!');
  return '';
};

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
    const qs = queryString.parse(location.search);
    let bearerToken;
    if (qs.token) {
      setAuthCookie('bearerToken', 'Bearer ' + qs.token, 10, '');
    }

    bearerToken = getAuthCookie('bearerToken');
    if (bearerToken) {
      this.currentUser = new User({id: 'current'});

      this.currentUser.fetch({headers: {Authorization: bearerToken}}).then(() => {
        this.render(this.context);
        console.log('fetch ok');
      }).catch((err) => {
        console.log('fetch in errore');
        console.log(err);
      });
    }
  }

  init() {
    this.layoutView = LayoutView;
    this.view = ProfileView;
    this.currentUser = null;
    this.getCurrentUser();
    //this.render(this.context);
  }
}

export class AddSkillsProfileController extends BaseLayoutController {
  static get loginRequired() {
    return false;
  }

  get context() {
    return {
      currentUser: this.currentUser,
      userSkills: this.userSkills,
      //autocompleteSkills: this.autocompleteSkills,
      suggestionsSkills: this.suggestionsSkills
    };
  }


  getCurrentUser() {
    const qs = queryString.parse(location.search);
    let bearerToken;
    if (qs.token) {
      setAuthCookie('bearerToken', 'Bearer ' + qs.token, 10, 'localhost');
    }

    bearerToken = getAuthCookie('bearerToken');
    if (bearerToken) {
      this.currentUser = new User({id: 'current'});

      this.currentUser.fetch({headers: {Authorization: bearerToken}}).then(() => {

        this.getUserSkills();


        this.render(this.context);
        console.log('currentUser', this.currentUser);
      }).catch((err) => {
        console.log('fetch in errore');
        console.log(err);
      });
    }
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

  init() {
    this.layoutView = LayoutView;
    this.view = AddSkillView;
    this.currentUser = null;
    this.userSkills = [];
    //this.autocompleteSkills = [];
    this.suggestionsSkills = [];
    this.getCurrentUser();
    //this.getUserSkills();
    this.render(this.context);
  }


}
