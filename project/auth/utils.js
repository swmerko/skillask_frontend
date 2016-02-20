export const setAuthCookie = function (cname, cvalue, exdays, domain, path = '/') {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = `;expires=${d.toUTCString()}`;
  let authCookie = `${cname}=${cvalue}${expires}`;
  if (domain) {
    authCookie += `;domain=${domain};path=${path}`;
  }
  document.cookie = authCookie;
};

export const getAuthCookie = function (cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  console.error('Token.getAuthCookie()', 'auth cookie not found!');
  return '';
};

