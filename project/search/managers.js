import { BaseCollection } from 'outlinejs/managers';
import { UserSkill } from './models';

export class UserSkillCollection extends BaseCollection {
  get url() {
    return 'https://skillask.herokuapp.com/skills/api/user_skills/';
  }

  get model() {
    return UserSkill;
  }

  parse(response) {
    return response.results;
  }
}
