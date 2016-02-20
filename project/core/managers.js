import { BaseCollection } from 'outlinejs/managers';
import { User } from './models';

export class UserCollection extends BaseCollection {
  get url() {
    return 'https://skillask.herokuapp.com/accounts/api/users/';
  }

  get model() {
    return User;
  }

  parse(response) {
    return response.results;
  }
}
