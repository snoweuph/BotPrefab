import { ClientEvents } from 'discord.js';
import Bot from '../types/bot';

export default abstract class BaseEvent {
	event: keyof ClientEvents;

	constructor(event: keyof ClientEvents) {
		this.event = event;
	}
	/* eslint-disable-next-line */
	abstract execute(bot: Bot, ...args: Array<any>): Promise<void>;
}