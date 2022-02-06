import { ClientEvents } from 'discord.js';
import Client from '../../types/Client';

export default abstract class BaseEvent {
    event: keyof ClientEvents;

    constructor(event: keyof ClientEvents) {
        this.event = event;
    }

    abstract execute(client: Client, ...args: any[]): Promise<void>;
}