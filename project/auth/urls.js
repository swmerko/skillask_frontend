import { BaseRouter, url } from 'outlinejs/lib/routers';

import { LoginController } from './controllers';

export default class extends BaseRouter {
  get urlPatterns() {
    return {
      '': url('login', LoginController)
    };
  }
}
