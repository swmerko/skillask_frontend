import { BaseLayoutController } from 'outlinejs/lib/controllers';

import { MaterialLayoutView } from '../core/views';
import { UserSkillCollection } from '../skills/managers';
import { SearchContentView } from './views';


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
      userSkills: this.userSkills
    };
  }

  init(skillId) {
    if (skillId) {
      this.userSkills = new UserSkillCollection();
      this.searchBySkillId(skillId);
    } else {
      this.userSkills = [];
    }
    this.render(this.context);
  }

  async searchBySkillId(skillId) {
    if (skillId) {
      let userSkillsResult = await this.userSkills.filterBySkillId(skillId);
      this.userSkills = userSkillsResult;
    } else {
      this.userSkills = [];
    }
    this.render(this.context);
  }

}
