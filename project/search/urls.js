import { SearchController } from './controllers';
import { BaseRouter, url } from 'outlinejs/routers';

export default class extends BaseRouter {
  get urlPatterns() {
    return {
      '/': url('search:main', SearchController)
    };
  }
}
