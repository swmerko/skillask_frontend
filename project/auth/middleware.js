/**
 * Created by erko on 25/04/16.
 */
import { runtime } from 'outlinejs/lib/contexts';

import OAuth2 from './oauth';
import { User } from './models';


export default class {

  async setUserByToken(token) {
    if (token) {
      var user = new User({id: 'current'});
      await user.fetch();
      var jsonUser = JSON.stringify(user);
      localStorage.setItem('__user', jsonUser);
      return JSON.parse(jsonUser);
    }
  }

  async preControllerInit(request, response) {
    if (runtime.isClient) {
      runtime.backboneSyncFunction = OAuth2.backboneSync;

      if (request.query.token) {
        let token = {accessToken: request.query.token};
        OAuth2.saveToken(token);
        request.user = await this.setUserByToken(token);
        let newUrl = request.absoluteUrl.replace(/&token=[^&]+/, '').replace(/\?token=[^&]+/, '');
        response.navigate(newUrl);

      } else {
        //var oauthClient = new OAuth2(request.absoluteUrl.replace(/&code=[^&]+/, '').replace(/\?code=[^&]+/, ''));
        ////check if code parameter is present
        //var code = request.query.code;
        //if (code) {
        //  let token = await oauthClient.tokenByCode(request);
        //  OAuth2.saveToken(token);
        //}

        //try to load user / token from local storage
        if (!request.user) {
          let storedUser = localStorage.getItem('__user');
          if (storedUser) {
            request.user = JSON.parse(storedUser);
            return;
          }
          //user not stored, try to get it using token
          let token = OAuth2.loadToken();
          request.user = await this.setUserByToken(token);
        }
      }
    }
  }
}
