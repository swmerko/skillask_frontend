import { BaseCollection } from 'outlinejs/lib/managers';
import { UserSkill } from './models';
import { Skill } from './models';

export class SkillCollection extends BaseCollection {
  get url() {
    return 'https://skillask.herokuapp.com/skills/api/skills/';
  }

  get model() {
    return Skill;
  }

  async all() {
    return await this.fetch();
  }

  parse(response) {
    return response.results;
  }

  filterBySkillName(skillName) {
    return this.fetch({data: {search: skillName}});
  }
}

export class UserSkillCollection extends BaseCollection {
  get url() {
    return 'https://skillask.herokuapp.com/skills/api/user_skills/';
  }

  get model() {
    return UserSkill;
  }

  async all() {
    return await this.fetch();
  }

  async filterBySkillId(skillId) {
    return await this.fetch({data: {skillId: skillId}});
  }

  parse(response) {
    return response.results;
  }
}
