import { BaseLayoutController } from 'outlinejs/lib/controllers';
import {settings, runtime} from 'outlinejs/lib/contexts';

import { MaterialLayoutView } from '../core/views';

import { globalContext } from '../global';
import { SkillCollection } from '../skills/managers';
import { UserSkill } from '../skills/models';

import { ProfileContentView } from './views';

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
      userSkills: this.userSkills,
      userSkillSuggestions: this.userSkillSuggestions
    };
  }

  addSkillToUser(skillId) {
    let userSkill = new UserSkill({
      skill: skillId,
      user: this.request.user.id
    });
    userSkill.save();
    console.log('skill added to user', skillId, 'user', this.request.user.id);
  }


  async getUserSkillSuggestions() {
    let userSkillSuggestions = {};

    for (var category of settings.SKILL_CATEGORIES) {
      let skills = new SkillCollection();
      userSkillSuggestions[category] = await skills.filterByCategory(category, true);
    }
    this.userSkillSuggestions = userSkillSuggestions;

    // update global

    if (runtime.isClient) {
      let newGlobalContext = globalContext.context.set('userSkillSuggestions', userSkillSuggestions);
      globalContext.context = newGlobalContext;
    }
    this.render(this.context);

  }

  init() {

    // initial context

    this.userSkillSuggestions = {};
    this.userSkills = [];

    // global context
    let globalContextObject = globalContext.context.toObject();

    // user skills
    if (globalContextObject.userSkills) {
      this.userSkills = globalContextObject.userSkills;
    } else {
      this.userSkills = [];
    }

    // user userSkillSuggestions
    if (this.request.user && runtime.isClient) {
      if (globalContext.context.get('userSkillSuggestions', false)) {
        this.userSkillSuggestions = globalContext.context.get('userSkillSuggestions', {});
      } else {
        this.getUserSkillSuggestions();
      }
    }
    this.render(this.context);
  }
}
