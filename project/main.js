import 'babel-polyfill';
import RootRouter from './urls';
import Boot from 'outlinejs/lib/boot';
import Settings from './settings';
import injectTapEventPlugin from 'react-tap-event-plugin';


Boot.init(Settings, RootRouter, 'main');


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
