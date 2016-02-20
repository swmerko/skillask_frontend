import { BaseModel } from 'outlinejs/models';

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
