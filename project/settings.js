import { BaseSettings } from 'outlinejs/lib/conf';

export default class extends BaseSettings {
  get MIDDLEWARE() {
    return [
      require('./auth/middleware')
    ];
  }

  // Backend Django
  get BACKEND_BASE_URL() {
    return 'https://skillask.herokuapp.com/';
  }

  // Authentication

  get USER_URL() {
    return `${this.BACKEND_BASE_URL}accounts/api/users/`;
  }


  get FACEBOOK_BACKEND() {
    return 'facebook';
  }

  get LINKEDIN_BACKEND() {
    return 'linkedin-oauth2';
  }

  get FACEBOOK_LOGIN_URL() {
    return `${this.BACKEND_BASE_URL}login/${this.FACEBOOK_BACKEND}/`;
  }

  get LINKEDIN_LOGIN_URL() {
    return `${this.BACKEND_BASE_URL}login/${this.LINKEDIN_BACKEND}/`;
  }

  // Skills

  get SKILL_CATEGORIES() {
    return ['1', '2', '3', '4'];
  }
}
