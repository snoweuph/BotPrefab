
import { EventEmitter } from 'events';
import { Connection } from 'mysql2/promise';
import Database from '@base/database';

const prefix = process.env.DISCORD_BOT_SHARD ? `[StateManager:${process.env.DISCORD_BOT_SHARD}]: ` : '[StateManager]: ';

class StateManager extends EventEmitter {
	connection: Connection;
	/* eslint-disable-next-line */
	constructor(opts?: any) {
		super(opts);
		Database.then((connection: Connection) => {
			this.connection = connection;
			console.log(`${prefix}Connected to Database`);
		});
	}
}
export default new StateManager() as StateManager;