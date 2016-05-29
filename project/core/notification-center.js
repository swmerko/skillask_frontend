import {EventEmitter} from 'events';

class NotificationCenter extends EventEmitter {
}

export const defaultCenter = new NotificationCenter();
