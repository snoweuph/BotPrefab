import { ClientEvents } from 'discord.js';
import Bot from '@baseTypes/bot';

export default abstract class BaseEvent {
	event: keyof ClientEvents;
	/**
	 * @param event The event to listen for. it must be a key of {@link ClientEvents}
	 */
	constructor(event: keyof ClientEvents) {
		this.event = event;
	}
	/**
	 * This method is called when the event is triggered.
	 * @param bot - The Bot Object itself {@link Bot} that stores a lot of useful information.
	 * @param args - The arguments passed to the event.
	 */
	/* eslint-disable-next-line */
	abstract execute(bot: Bot, ...args: Array<any>): Promise<void>;
}