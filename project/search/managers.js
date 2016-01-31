import { BaseCollection } from 'outlinejs/managers';
import { UserSkillSearchResult } from './models';

export class UserSkillSearchResultCollection extends BaseCollection {
  get url() {
    return 'https://skillask.herokuapp.com/search/api/base_search/';
  }

  get model() {
    return UserSkillSearchResult;
  }
}
