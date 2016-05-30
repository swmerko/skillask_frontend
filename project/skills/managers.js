import {BaseCollection} from 'outlinejs/lib/managers';
import {UserSkill, Skill, SupportUserSkill} from './models';

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


export class SupportUserSkillCollection extends BaseCollection {
  get url() {
    return 'https://skillask.herokuapp.com/skills/api/support_user_skills/';
  }

  get model() {
    return SupportUserSkill;
  }

  async all() {
    return await this.fetch();
  }

  async filterBySupporterAndUserSkill(supporter, userSkill) {
    return await this.fetch({
      data: {
        supporter: supporter,
        userSkill: userSkill
      }
    });
  }

  parse(response) {
    return response.results;
  }
}
