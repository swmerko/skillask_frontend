import { BaseLayoutController } from 'outlinejs/lib/controllers';
import {settings, runtime} from 'outlinejs/lib/contexts';

import { MaterialLayoutView } from '../core/views';

import { globalContext } from '../global';
import { SkillCollection } from '../skills/managers';
import { UserSkill } from '../skills/models';
import { GuiNotifications } from '../core/notifications';


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

  async addSkillToUser(skill) {
    let userSkill = new UserSkill({
      skill: skill.id,
      user: this.request.user.id,
      skillCategory: skill.category,
      skillName: skill.name
    });
    try {
      await userSkill.save();
      this.userSkillSuggestions[skill.category] = await this.getSkillSuggestion(skill.category);
      this.render(this.context);
      GuiNotifications.snackBar(`We added ${skill.name} to your profile!`, 'Undo', this.removeSkillToUser.bind(this, userSkill));
    } catch (err) {
      GuiNotifications.snackBar('Ops! Something went wrong!');
      console.log(err);
    }
  }

  async removeSkillToUser(userSkill) {
    try {
      let skillCategory = userSkill.skillCategory;
      let skillName = userSkill.skillName;
      await userSkill.destroy({headers: {'content-type': 'application/json'}});
      this.userSkillSuggestions[skillCategory] = await this.getSkillSuggestion(skillCategory);
      this.render(this.context);
      GuiNotifications.snackBar(`We removed ${skillName} to your profile!`);
    } catch (err) {
      GuiNotifications.snackBar('Ops! Something went wrong!');
      console.log(err);
    }
  }

  async getSkillSuggestion(category) {
    let result = [];
    if (category) {
      let skills = new SkillCollection();
      result = await skills.filterByCategory(category, true);
    } else {
      console.log('Pass a category to getSkillSuggestion');
    }
    return result;
  }

  async getUserSkillSuggestions() {
    let userSkillSuggestions = {};

    for (var category of settings.SKILL_CATEGORIES) {
      userSkillSuggestions[category] = await this.getSkillSuggestion(category);
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
