import { AlloController, SearchController } from './controllers';
import { BaseRouter, url } from 'outlinejs/routers';

export default class extends BaseRouter {
  get urlPatterns() {
    return {
      '/': url('allo:home', AlloController),
      'search/:searchString/': url('allo:search', SearchController)
    };
  }
}