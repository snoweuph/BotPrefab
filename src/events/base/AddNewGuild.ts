import Client from '../../types/Client';
import BaseEvent from '../../base/classes/BaseEvent';
import StateManager from '../../base/StateManager';
import { Connection } from 'mysql2/promise';

export default class AddNewGuildEvent extends BaseEvent {
    connection: Connection;
    constructor() {
        super('guildCreate');
        this.connection = StateManager.connection;
    }

    async execute(client: Client, ...args: any[]): Promise<void> {
        try {
            await this.connection.query(
                `INSERT INTO GuildSettings VALUES('${args[0].id}')`
            );
        } catch (error) {
            if (error.code == 'ER_DUP_ENTRY') return;
            console.error(error);
        }
    }
}