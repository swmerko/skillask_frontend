import {BaseController} from 'outlinejs/lib/controllers';
import {runtime, settings} from 'outlinejs/lib/contexts';

import {LoginView, LogoutView} from './views';


export class LoginController extends BaseController {
  static get loginRequired() {
    return false;
  }

  get view() {
    return LoginView;
  }

  init(backend) {
    if (runtime.isClient) {
      if (this.request.query['next-url'] && this.request.user) {
        this.response.navigate(this.request.query['next-url']);
      } else {
        let loginUrl = settings.FACEBOOK_LOGIN_URL;
        if (backend) {
          if (backend === settings.FACEBOOK_BACKEND) {
            loginUrl = settings.FACEBOOK_LOGIN_URL;
          }
          if (backend === settings.LINKEDIN_BACKEND) {
            loginUrl = settings.LINKEDIN_LOGIN_URL;
          }
        }
        //let nextUrl = this.request.query['next-url'];
        //if (!nextUrl) {
        //  nextUrl = this.request.absoluteUrl;
        //}
        //let url = `${loginUrl}?next=${nextUrl}`;
        this.response.navigate(loginUrl);
      }
    } else {
      this.render();
    }
  }
}

export class LogoutController extends BaseController {
  static get loginRequired() {
    return false;
  }

  get view() {
    return LogoutView;
  }

  init() {
    if (runtime.isClient) {
      localStorage.removeItem('__authToken');
      localStorage.removeItem('__user');

      let nextUrl = this.request.query['next-url'];
      if (!nextUrl) {
        nextUrl = this.request.absoluteUrl;
      }
      let logoutUrl = `${settings.OAUTH2_LOGOUT_URL}?next=${nextUrl}`;
      this.response.navigate(logoutUrl);
    } else {
      this.render();
    }
  }
}
