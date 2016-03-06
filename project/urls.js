import { BaseRouter, include } from 'outlinejs/lib/routers';
import AlloAppRouter from './allo-app/urls';
import ExampleRouter from './example/urls';
import SearchRouter from './search/urls';

export default class extends BaseRouter {
  get urlPatterns() {
    return {
      '': include(ExampleRouter),
      allo: include(AlloAppRouter),
      search: include(SearchRouter)
    };
  }
}
