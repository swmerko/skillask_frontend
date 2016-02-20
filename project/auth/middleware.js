import { setAuthCookie } from './utils';
const queryString = require('query-string');

export default class {
  preControllerInit() {
    return new Promise((resolve, reject) => {
      try {
        console.log('Middleware authentication');

        const qs = queryString.parse(location.search);
        if (qs.token) {
          setAuthCookie('bearerToken', 'Bearer ' + qs.token, 10, '');
        }
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}

//getCurrentUser() {
//  const qs = queryString.parse(location.search);
//  let bearerToken;
//  if (qs.token) {
//    setAuthCookie('bearerToken', 'Bearer ' + qs.token, 10, '');
//  }
//
//  bearerToken = getAuthCookie('bearerToken');
//  if (bearerToken) {
//    this.currentUser = new User({id: 'current'});
//
//    this.currentUser.fetch({headers: {Authorization: bearerToken}}).then(() => {
//      this.render(this.context);
//    }).catch((err) => {
//      console.log(err);
//    });
//  }
//}
