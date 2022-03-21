import { EventEmitter } from 'events';
import { Connection } from 'mysql2/promise';
import Database from './database';

class StateManager extends EventEmitter {
	connection: Connection;
	constructor(opts?) {
		super(opts);
		Database.then((connection: Connection) => {
			this.connection = connection;
			console.log('[StateManager] Connected to Database');
		});
	}
}
export default new StateManager() as StateManager;