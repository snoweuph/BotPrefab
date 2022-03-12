import Bot from '../../base/types/bot';
import BaseEvent from '../../base/classes/baseEvent';
import StateManager from '../../base/stateManager';
import { Connection } from 'mysql2/promise';

export default class AddNewGuildEvent extends BaseEvent {
    connection: Connection;
    constructor() {
        super('guildCreate');
        this.connection = StateManager.connection;
    }

    async execute(bot: Bot, ...args: any[]): Promise<void> {
        try {
            await this.connection.query(
                `INSERT INTO GuildSettings (guildId) VALUES('${args[0].id}')`
            );
        } catch (error) {
            if (error.code == 'ER_DUP_ENTRY') return;
            console.error(error);
        }
    }

}