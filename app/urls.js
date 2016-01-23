import { BaseRouter, include } from 'outlinejs/routers';
import AlloAppRouter from './allo-app/urls';
import SearchRouter from './search/urls';


export default class extends BaseRouter {
  get urlPatterns() {
    return {
      '/': include(AlloAppRouter),
      '/search/': include(SearchRouter)
    };
  }
}
