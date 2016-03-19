import 'babel-polyfill';
import RootRouter from './urls';
import Boot from 'outlinejs/lib/boot';
import Settings from './settings';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin

Boot.init(Settings, RootRouter, 'main');
