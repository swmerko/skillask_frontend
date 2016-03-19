import { BaseController } from 'outlinejs/lib/controllers';
import { runtime } from 'outlinejs/lib/contexts';

import OAuth2 from './oauth';

import { LoginView } from './views';

export class LoginController extends BaseController {
  static get loginRequired() {
    return false;
  }

  get view() {
    return LoginView;
  }

  init() {
    if (runtime.isClient) {
      if (this.request.query['next-url'] && this.request.user) {
        this.response.navigate(this.request.query['next-url']);
      } else {
        var oauthClient = new OAuth2(this.request.absoluteUrl);
        oauthClient.authorizationCodeGrant(this.response);
      }
    } else {
      this.render();
    }
  }
}
