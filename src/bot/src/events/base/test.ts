import Bot from '../../base/types/bot';
import BaseEvent from '../../base/classes/baseEvent';

export default class TestEvent extends BaseEvent {
	constructor() {
		super('interactionCreate');
	}
	/* eslint-disable-next-line */
    async execute(bot: Bot, ...args: any[]): Promise<void> {
		console.log(args);
	}
}