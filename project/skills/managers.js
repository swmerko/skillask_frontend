import {BaseCollection} from 'outlinejs/lib/managers';
import {UserSkill, Skill} from './models';

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

  filterBySkillName(skillName, excludeTheirSkills = false) {
    return this.fetch({
      data: {
        search: skillName,
        excludeTheirSkills: excludeTheirSkills
      }
    });
  }

  filterByCategory(category, excludeTheirSkills = false) {
    return this.fetch({
      data: {
        category: category,
        excludeTheirSkills: excludeTheirSkills
      }
    });
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

  async filterBySkillId(skillId, includeSupporters = false) {
    return await this.fetch({
      data: {
        skillId: skillId,
        includeSupporters: includeSupporters
      }
    });
  }

  parse(response) {
    return response.results;
  }
}
