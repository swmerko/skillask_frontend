import { BaseLayoutController } from 'outlinejs/lib/controllers';
import { BaseLayoutView } from '../core/views';
import { SearchContentView } from './views';
import { UserSkillCollection } from '../skills/managers';
import { gettext } from 'outlinejs/lib/utils/translation';
import { runtime } from 'outlinejs/lib/contexts';

export class SearchContoller extends BaseLayoutController {
  static get loginRequired() {
    return false;
  }

  get layoutView() {
    return BaseLayoutView;
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
    this.search();
    this.render(this.context);
  }

  async search() {

    let userSkillsResult = await this.userSkills.all();
    this.userSkills = userSkillsResult;
    this.render(this.context);
  }

}
