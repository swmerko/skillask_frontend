import { BaseLayoutController } from 'outlinejs/lib/controllers';
import { runtime } from 'outlinejs/lib/contexts';

import { MaterialLayoutView } from '../core/views';
import { UserSkillCollection } from '../skills/managers';
import { SearchContentView } from './views';

import { globalContext } from '../global';

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
      userSkillSuggestions: this.userSkillSuggestions
    };
  }

  async init(skillId) {

    // initial context

    this.userSkillSuggestions = {};
    this.userSkills = [];

    // global context
    if (skillId) {
      this.userSkills = new UserSkillCollection();
      this.searchBySkillId(skillId);
    } else {
      if (runtime.isClient) {
        this.userSkills = globalContext.context.get('userSkills', []);
      }
    }
    // user skills suggestions
    if (runtime.isClient) {
      this.userSkillSuggestions = globalContext.context.get('userSkillSuggestions', {});
    }

    this.render(this.context);
  }

  async searchBySkillId(skillId) {
    if (skillId) {
      let userSkillsResult = await this.userSkills.filterBySkillId(skillId);
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

}
