/**
 * Created by erko on 25/04/16.
 */
import {BaseModel} from 'outlinejs/lib/models';
import {settings} from 'outlinejs/lib/contexts';


export class User extends BaseModel {
  get urlRoot() {
    return settings.USER_URL;
  }

  get id() {
    return this.get('id');
  }

  get name() {
    return this.get('name');
  }

  get email() {
    return this.get('email');
  }
}