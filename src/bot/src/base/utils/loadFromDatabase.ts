import Bot from '@baseTypes/bot';
import StateManager from '@base/StateManager';

export default async function loadValue(bot: Bot, variableName: string, isBool?: boolean): Promise<void> {
	bot.client.guilds.cache.forEach(guild => {
		StateManager.connection.query(
			`SELECT ${variableName} FROM GuildSettings WHERE guildId = '${guild.id}'`
		).then(result => {
			if (result[0][0]) {
				const variableObject = result[0][0];
				const variable = variableObject[variableName];
				if (isBool) {
					StateManager.emit(`${variableName}Fetched`, guild.id, !!variable);
				} else {
					StateManager.emit(`${variableName}Fetched`, guild.id, variable);
				}
			}
		}).catch(error => { console.log(error); });
	});
}