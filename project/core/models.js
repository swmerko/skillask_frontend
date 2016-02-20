import { BaseModel } from 'outlinejs/models';

export class User extends BaseModel {
  get id() {
    return this.get('id');
  }

  get pk() {
    return this.get('pk');
  }

  get lastLogin() {
    return this.get('last_login');
  }

  get isSuperuser() {
    return this.get('is_superuser');
  }

  get firstName() {
    return this.get('first_name');
  }

  get lastName() {
    return this.get('last_name');
  }

  get email() {
    return this.get('email');
  }

  get dateJoined() {
    return this.get('date_joined');
  }

  static get isAuthenticated() {
    return true;
  }

  get urlRoot() {
    return 'https://skillask.herokuapp.com/accounts/api/users/';
  }
}
