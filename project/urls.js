import { BaseRouter, include } from 'outlinejs/lib/routers';
import AlloAppRouter from './allo-app/urls';
import HomeRouter from './home/urls';
import SearchRouter from './search/urls';
import ProfileRouter from './profile/urls';
import AuthRouter from './auth/urls';

export default class extends BaseRouter {
  get urlPatterns() {
    return {
      '': include(HomeRouter),
      allo: include(AlloAppRouter),
      search: include(SearchRouter),
      profile: include(ProfileRouter),
      auth: include(AuthRouter)
    };
  }
}
