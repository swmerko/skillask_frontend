import { BaseRouter, url } from 'outlinejs/lib/routers';

import { SearchSkillContoller } from './controllers';

export default class extends BaseRouter {
  get urlPatterns() {
    return {
      '': url('search:main', SearchSkillContoller),
      'skill/:skillId:': url('search:skill', SearchSkillContoller)
    };
  }
}
