import Client from '../../base/types/Client';
import BaseEvent from '../../base/classes/BaseEvent';
import StateManager from '../../../base/StateManager';
import { Connection } from 'mysql2/promise';

export default class LoadGuildsEvent extends BaseEvent {
    connection: Connection;
    constructor() {
        super('ready');
        this.connection = StateManager.connection;
    }

    async execute(client: Client, ...args: any[]): Promise<void> {
        /* LOAD A VARIABLE FROM THE DATABASE 
        client.client.guilds.cache.forEach(guild => {
            this.connection.query(
                `SELECT variablename FROM GuildSettings WHERE guildId = '${guild.id}'`
            ).then(result => {
                const variablename = result[0][0].variablename;
                StateManager.emit('variablenameFetched', guild, variablename);
            }).catch(error => { console.log(error) });
        });
        */
    }
}