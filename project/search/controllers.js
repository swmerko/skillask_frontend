import { BaseLayoutController } from 'outlinejs/lib/controllers';

import { LayoutView } from '../core/views';
import { UserSkillCollection } from '../skills/managers';
import { SearchContentView, SearchSkillContentView } from './views';

export class SearchContoller extends BaseLayoutController {
  static get loginRequired() {
    return false;
  }

  get layoutView() {
    return LayoutView;
  }

  get view() {
    return SearchContentView;
  }

  get context() {
    return {
      userSkills: this.userSkills
    };
  }

  init() {
    this.userSkills = new UserSkillCollection();
    this.render(this.context);
  }

}

export class SearchSkillContoller extends BaseLayoutController {
  static get loginRequired() {
    return false;
  }

  get layoutView() {
    return LayoutView;
  }

  get view() {
    return SearchSkillContentView;
  }

  get context() {
    return {
      userSkills: this.userSkills
    };
  }

  init(skillId) {
    this.userSkills = new UserSkillCollection();
    this.searchBySkillId(skillId);
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
