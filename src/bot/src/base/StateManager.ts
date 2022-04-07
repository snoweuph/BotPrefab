
import { EventEmitter } from 'events';
import { Connection } from 'mysql2/promise';
import Database from '@base/database';

class StateManager extends EventEmitter {
	connection: Connection;
<<<<<<< HEAD
=======

>>>>>>> dev
	/* eslint-disable-next-line */
	constructor(opts?: any) {
		super(opts);
		Database.then((connection: Connection) => {
			this.connection = connection;
			console.log('[StateManager] Connected to Database');
		});
	}
}
export default new StateManager() as StateManager;