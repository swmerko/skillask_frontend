import {BaseLayoutController} from 'outlinejs/lib/controllers';
import {runtime} from 'outlinejs/lib/contexts';
import {MaterialLayoutView} from '../core/views';
import {UserSkillCollection, SupportUserSkillCollection} from '../skills/managers';
import {Skill, SupportUserSkill} from '../skills/models';
import {SearchContentView} from './views';
import {globalContext} from '../global';
import {GuiNotifications} from '../core/notifications';

export class SearchSkillContoller extends BaseLayoutController {
  static get loginRequired() {
    return false;
  }

  get layoutView() {
    return MaterialLayoutView;
  }

  get view() {
    return SearchContentView;
  }

  get context() {
    return {
      userSkills: this.userSkills,
      userSkillSuggestions: this.userSkillSuggestions,
      skill: this.skill,
      suggestionsEnabled: this.suggestionsEnabled
    };
  }

  async unSupportUser(supportUserSkill = null, userSkill = null, supporter = this.request.user.id) {
    // priority to supportUserSkill, else find a supportUserSkill with supporter and userSkill and delete it
    if (supportUserSkill !== null) {
      try {
        let userFullName = supportUserSkill.userFullName || userSkill.userFullName;
        let skillName = supportUserSkill.skillName || userSkill.skillName;
        await supportUserSkill.destroy({headers: {'content-type': 'application/json'}});
        if (userSkill) {
          userSkill.supporters = userSkill.supporters.filter(item => item !== supporter);
        }
        this.render(this.context);

        GuiNotifications.snackBar(`Your support for ${userFullName} in ${skillName} has been removed!`);
        return true;
      } catch (err) {
        GuiNotifications.snackBar('Ops! Something went wrong!');
        console.log(err);
        return false;
      }
    } else if (supporter && userSkill) {

      try {
        let supportUserSkills = new SupportUserSkillCollection();
        await supportUserSkills.filterBySupporterAndUserSkill(supporter, userSkill.id);
        if (supportUserSkills.length === 1) {
          supportUserSkill = supportUserSkills.at(0);
          this.unSupportUser(supportUserSkill, userSkill);
        }

      } catch (err) {
        GuiNotifications.snackBar('Ops! Something went wrong!');
        console.log(err);
        return false;
      }
    } else {
      console.log('Give to unSupportUser supportUserSkill or supporter and userSkill');
    }
  }

  async supportUser(userSkill) {
    if (this.request.user) {
      let supportUserSkill = new SupportUserSkill({
        userSkill: userSkill.id,
        supporter: this.request.user.id,
        skillName: userSkill.skillName,
        userFullName: userSkill.userFullName
      });
      try {
        await supportUserSkill.save();
        userSkill.supporters.push(this.request.user.id);
        GuiNotifications.snackBar(`Now you support ${userSkill.userFullName} in  ${userSkill.skillName}!`, 'Undo', this.unSupportUser.bind(this, supportUserSkill, userSkill, this.request.user.id));
        this.render(this.context);
        return true;
      } catch (err) {
        GuiNotifications.snackBar('Ops! Something went wrong!');
        console.log(err);
        return false;
      }
    } else {
      GuiNotifications.snackBar('Sorry! You shuld be logged for this action.');
    }
  }

  async getSkill(skillId) {
    try {
      let skill = new Skill({id: skillId});
      this.skill = await skill.fetch();
      if (runtime.isClient) {
        let newGlobalContext = globalContext.context.set('skill', skill);
        globalContext.context = newGlobalContext;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async searchBySkillId(skillId) {
    if (skillId) {
      await this.getSkill(skillId);
      let userSkillsResult = await this.userSkills.filterBySkillId(skillId, true);
      this.userSkills = userSkillsResult;

      if (runtime.isClient) {
        let newGlobalContext = globalContext.context.set('userSkills', userSkillsResult);
        globalContext.context = newGlobalContext;
      }
    } else {
      this.userSkills = [];
    }
    this.render(this.context);
  }

  setSuggestionsEnabled(value) {
    this.suggestionsEnabled = value;
    this.render(this.context);
  }

  async init(skillId) {

    // initial context
    this.userSkillSuggestions = {};
    this.userSkills = [];
    this.skill = new Skill();
    this.suggestionsEnabled = false;

    // global context
    if (skillId) {
      this.userSkills = new UserSkillCollection();
      this.searchBySkillId(skillId);
    } else {
      if (runtime.isClient) {
        this.userSkills = globalContext.context.get('userSkills', []);
        this.skill = globalContext.context.get('skill', {});
      }
    }
    // user skills suggestions
    if (runtime.isClient) {
      this.userSkillSuggestions = globalContext.context.get('userSkillSuggestions', {});
      this.skill = globalContext.context.get('skill', {});
    }

    this.render(this.context);
  }

}
