import Bot from '@base/types/bot';
import BaseEvent from '@base/classes/baseEvent';
import StateManager from '@base/StateManager';
import { Connection } from 'mysql2/promise';
import loadFromDatabase from '@base/utils/loadFromDatabase';

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
				if (!result[0][0]) {
					this.connection.query(
						`INSERT INTO GuildSettings (guildId) VALUES('${guild.id}')`
					);
				}
			}).catch(error => { console.log(error); });
		});
		//settings to enable/disable features
		loadFromDatabase(bot, 'enableFeatureWelcomeMessage', true);
		loadFromDatabase(bot, 'enableFeatureGoodbyeMessage', true);
		//configuration for channels
		loadFromDatabase(bot, 'welcomeMessageChannelId');
		loadFromDatabase(bot, 'goodbyeMessageChannelId');

		//welcome message
		loadFromDatabase(bot, 'welcomeMessageTitle');
		loadFromDatabase(bot, 'welcomeMessageBody');
		loadFromDatabase(bot, 'welcomeMessageColor');
		loadFromDatabase(bot, 'welcomeMessageImageEnabled');
		loadFromDatabase(bot, 'welcomeMessageImageUrl');
		loadFromDatabase(bot, 'welcomeMessageImageAccentColor');

		//goodbye message
		loadFromDatabase(bot, 'goodbyeMessageTitle');
		loadFromDatabase(bot, 'goodbyeMessageBody');
		loadFromDatabase(bot, 'goodbyeMessageColor');
		loadFromDatabase(bot, 'goodbyeMessageImageEnabled');
		loadFromDatabase(bot, 'goodbyeMessageImageUrl');
		loadFromDatabase(bot, 'goodbyeMessageImageAccentColor');

	}
}