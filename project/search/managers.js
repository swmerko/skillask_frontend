import { BaseCollection } from 'outlinejs/managers';
import { UserSkill } from './models';

export class UserCollection extends BaseCollection {
  get url() {
    return 'https://skillask.herokuapp.com/search/api/base_search/';
  }

  get model() {
    return UserSkill;
  }
}
