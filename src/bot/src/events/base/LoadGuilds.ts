import Bot from '@base/types/bot';
import BaseEvent from '@base/classes/baseEvent';
import StateManager from '@base/StateManager';
import { Connection, RowDataPacket } from 'mysql2/promise';

export default class LoadGuildsEvent extends BaseEvent {
	connection: Connection;
	constructor() {
		super('ready');
		this.connection = StateManager.connection;
	}

	/* eslint-disable-next-line */
	async execute(bot: Bot, ...args: Array<any>): Promise<void> {
		//insert guilds where the bot is on, but has no database entry yet for some reason
		bot.client.guilds.cache.forEach(guild => {
			StateManager.connection.query(
				`SELECT guildId FROM GuildSettings WHERE guildId = '${guild.id}'`
			).then(result => {
				const _result = result[0] as Array<RowDataPacket>;
				if (!_result[0]) {
					this.connection.query(
						`INSERT INTO GuildSettings (guildId) VALUES('${guild.id}')`
					);
				}
			}).catch(error => { console.log(error); });
		});

		//query all settings
		StateManager.connection.query(
			'SELECT * FROM GuildSettings'
		).then(result => {
			const guildData = result[0] as Array<RowDataPacket>;
			const columDefinitions = result[1];
			//loop through Colum definitions to get the encoding Types so that booleans get converted to booleans from TinyInts
			const columEncodingDefinitionMap = new Map<string, string>();
			for (const colum of columDefinitions) {
				// eslint-disable-next-line
				// @ts-ignore -> the typecompletion is wrong for some reason
				columEncodingDefinitionMap.set(colum.name, colum.encoding);
			}
			//loop trrough all data
			for (const guildRow of guildData) {
				//get if this guild is inside this shards cache
				if (!bot.client.guilds.cache.has(guildRow.guildId)) continue;
				//send all the data throug the stateManager
				for (const field in guildRow) {
					if (field === 'guildId') continue;
					StateManager.emit(`${field}Fetched`, guildRow.guildId, columEncodingDefinitionMap.get(field) === 'binary' ? !!guildRow[field] : guildRow[field]);
				}
			}
		})
	}
}