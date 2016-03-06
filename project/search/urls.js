import { SearchContoller } from './controllers';
import { BaseRouter, url } from 'outlinejs/lib/routers';

export default class extends BaseRouter {
  get urlPatterns() {
    return {
      '': url('search:main', SearchContoller)
    };
  }
}
