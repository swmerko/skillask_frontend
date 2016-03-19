import { runtime } from 'outlinejs/lib/contexts';

import OAuth2 from './oauth';
import { User } from './models';

export default class {
  async preControllerInit(request) {
    if (runtime.isClient) {
      runtime.backboneSyncFunction = OAuth2.backboneSync;
      var oauthClient = new OAuth2(request.absoluteUrl.replace(/&code=[^&]+/, ''));
      //check if code parameter is present
      var code = request.query.code;
      if (code) {
        let token = await oauthClient.tokenByCode(request);
        oauthClient.saveToken(token);
      }
      //try to load user / token from local storage
      if (!request.user) {
        let storedUser = localStorage.getItem('__user');
        if (storedUser) {
          request.user = JSON.parse(storedUser);
          return;
        }
        //user not stored, try to get it using token
        let token = oauthClient.loadToken();
        if (token) {
          var user = new User({id: 'current'});
          await user.fetch();
          var jsonUser = JSON.stringify(user);
          localStorage.setItem('__user', jsonUser);
          request.user = JSON.parse(jsonUser);
        }
      }
    }
  }
}
