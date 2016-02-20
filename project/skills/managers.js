import { BaseCollection } from 'outlinejs/managers';
import { Skill } from './models';

export class SkillCollection extends BaseCollection {
  get url() {
    return 'https://skillask.herokuapp.com/skills/api/skills/';
  }

  get model() {
    return Skill;
  }

  parse(response) {
    return response.results;
  }
}
