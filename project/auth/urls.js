import { BaseRouter, url } from 'outlinejs/lib/routers';

import { LoginController, LogoutController } from './controllers';


export default class extends BaseRouter {
  get urlPatterns() {
    return {
      '': url('auth:login', LoginController),
      'login/:backend:': url('auth:loginBackend', LoginController),
      logout: url('auth:logout', LogoutController)
    };
  }
}
