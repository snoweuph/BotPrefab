import { Client } from 'discord.js';
import BaseEvent from '../../base/classes/BaseEvent';

export default class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready');
    }

    async execute(client: Client<boolean>, ...args: any[]): Promise<void> {
        console.log(`${client.user.tag} is online!`);
    }
}