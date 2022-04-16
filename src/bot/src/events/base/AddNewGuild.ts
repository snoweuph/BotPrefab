import Bot from '@base/types/bot';
import BaseEvent from '@base/classes/baseEvent';
import StateManager from '@base/StateManager';
import { Connection } from 'mysql2/promise';

export default class AddNewGuildEvent extends BaseEvent {
	connection: Connection;
	constructor() {
		super('guildCreate');
		this.connection = StateManager.connection;
	}

	/* eslint-disable-next-line */
	async execute(bot: Bot, ...args: Array<any>): Promise<void> {
		try {
			await this.connection.query(
				`INSERT INTO GuildSettings (guildId) VALUES('${args[0].id}')`
			);
			//TODO: add new discord server to cached guilds
		} catch (error) {
			if (error.code == 'ER_DUP_ENTRY') return;
			console.error(error);
		}
	}

}