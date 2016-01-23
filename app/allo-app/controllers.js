import { BaseController } from 'outlinejs/controllers';
import { AlloView, SearchView } from './views';

export class AlloController extends BaseController {
  static get loginRequired() {
    return false;
  }

  init() {
    this.view = AlloView;
    this.render();
  }

}

export class SearchController extends BaseController {
  static get loginRequired() {
    return false;
  }

  search() {
    return [
      {id: 1, name: 'cicciopasticcio'},
      {id: 2, name: 'lalala'}
    ];
  }

  init(searchString) {
    this.view = SearchView;
    this.render({search: searchString});
  }

}
