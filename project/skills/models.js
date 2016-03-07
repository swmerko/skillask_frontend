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
}

export class UserSkill extends BaseModel {
  get id() {
    return this.get('id');
  }

  get skillId() {
    return this.get('skill_id');
  }

  get skillName() {
    return this.get('skill_name');
  }

  get userId() {
    return this.get('user_id');
  }

  get userEmail() {
    return this.get('user_email');
  }

  get userFullName() {
    return this.get('user_full_name');
  }

  get userProfileImageUrl() {
    return this.get('user_profile_image_url');
  }

  get urlRoot() {
    return 'https://skillask.herokuapp.com/skills/api/user_skills/';
  }
}