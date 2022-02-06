import { Client, Message as DiscordMessage } from 'discord.js';
import BaseEvent from '../../base/classes/BaseEvent';

export default class MessageEvent extends BaseEvent {
    constructor() {
        super('messageCreate');
    }

    async execute(client: Client<boolean>, ...args: any[]): Promise<void> {
        let message: DiscordMessage = args[0];
        console.log(message);
    }
}