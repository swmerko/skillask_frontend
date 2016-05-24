import { BaseModel } from 'outlinejs/lib/models';

export class Skill extends BaseModel {
  get id() {
    return this.get('id');
  }

  get name() {
    return this.get('name');
  }

  get slug() {
    return this.get('slug');
  }

  get category() {
    return this.get('category');
  }
}

export class UserSkill extends BaseModel {
  get id() {
    return this.get('id');
  }

  get skill() {
    return this.get('skill');
  }

  //set skill(value) {
  //  return this.set('skill', value);
  //}

  get skillName() {
    return this.get('skillName');
  }

  get user() {
    return this.get('user');
  }

  //set userId(value) {
  //  return this.set('user', value);
  //}

  get userEmail() {
    return this.get('userEmail');
  }

  get userFullName() {
    return this.get('userFullName');
  }

  get userProfileImageUrl() {
    return this.get('userProfileImageUrl');
  }

  get urlRoot() {
    return 'https://skillask.herokuapp.com/skills/api/user_skills/';
  }
}
