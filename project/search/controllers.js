import { BaseLayoutController } from 'outlinejs/lib/controllers';
import { LayoutView } from '../core/views';
import { SearchContentView } from './views';
import { UserSkillCollection } from '../skills/managers';
import { gettext } from 'outlinejs/lib/utils/translation';
//import { runtime } from 'outlinejs/lib/contexts';

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

  async search(skill) {
    console.log('inizio', skill.id);
    if (skill.id) {
      let userSkillsResult = await this.userSkills.filterBySkillId(skill.id);
      this.userSkills = userSkillsResult;
    } else {
      this.userSkills = [];
    }
    console.log('fine');
    this.render(this.context);
  }

}
