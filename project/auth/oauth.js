import { settings } from 'outlinejs/lib/contexts';
import { backboneSync } from 'outlinejs/lib/utils/patches/backbone';

export default class OAuth2 {
  constructor(redirectUri, clientId = settings.OAUTH2_CLIENT_ID, clientSecret = settings.OAUTH2_CLIENT_SECRET, tokenUrl = settings.OAUTH2_TOKEN_URL, authorizeUrl = settings.OAUTH2_AUTHORIZE_URL) {
    this._redirectUri = redirectUri;
    this._oauth2Client = new (require('client-oauth2'))({
      clientId: clientId,
      clientSecret: clientSecret,
      accessTokenUri: tokenUrl,
      authorizationUri: authorizeUrl,
      redirectUri: this._redirectUri
    });
  }

  authorizationCodeGrant(response) {
    response.navigate(this._oauth2Client.code.getUri());
  }

  tokenByCode(request) {
    var code = request.query.code;
    var redirectUri = /\?/.test(this._redirectUri) ? `${this._redirectUri}&code=${code}` : `${this._redirectUri}?code=${code}`;
    return this._oauth2Client.code.getToken(redirectUri);
  }

  saveToken(token) {
    //TODO: map other token props (the real token is not serializable ;()
    localStorage.setItem('__authToken', JSON.stringify({ accessToken: token.accessToken }));
  }

  loadToken() {
    var token = localStorage.getItem('__authToken');
    if (token) {
      return JSON.parse(token);
    }
  }

  static backboneSync(method, model, options = {}) {
    var oauthClient = new OAuth2('http://localhost');
    var token = oauthClient.loadToken();
    if (token) {
      options.headers = options.headers || {};
      options.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    return backboneSync(method, model, options);
  }
}
