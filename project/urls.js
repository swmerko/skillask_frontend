import { BaseRouter, include } from 'outlinejs/routers';
import AlloAppRouter from './allo-app/urls';
import SearchRouter from './search/urls';
import CoreRouter from './core/urls';

export default class extends BaseRouter {
  get urlPatterns() {
    return {
      '': include(SearchRouter),
      allo: include(AlloAppRouter),
      core: include(CoreRouter)
    };
  }
}
