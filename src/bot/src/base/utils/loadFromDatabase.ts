import { Connection } from "mysql2/promise";
import Bot from "../types/bot";
import StateManager from "../stateManager";

export default async function loadValue(bot: Bot, variableName: string): Promise<void> {
    bot.client.guilds.cache.forEach(guild => {
        StateManager.connection.query(
            `SELECT ${variableName} FROM GuildSettings WHERE guildId = '${guild.id}'`
        ).then(result => {
            const variable = result[0][0].variableName;
            StateManager.emit(`${variableName}Fetched`, guild, variable);
        }).catch(error => { console.log(error) });
    });
}