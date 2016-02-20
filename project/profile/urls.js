import { ProfileController, AddSkillsProfileController } from './controllers';
import { BaseRouter, url } from 'outlinejs/routers';

export default class extends BaseRouter {
  get urlPatterns() {
    return {
      '': url('profile:main', ProfileController),
      addSkills: url('profile:addSkills', AddSkillsProfileController)
    };
  }
}
