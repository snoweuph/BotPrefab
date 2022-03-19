import Bot from '../../base/types/bot';
import BaseEvent from '../../base/classes/baseEvent';
import { AutocompleteInteraction } from 'discord.js';

export default class TestEvent extends BaseEvent {
	constructor() {
		super('interactionCreate');
	}
	/* eslint-disable-next-line */
	async execute(bot: Bot, ...args: any[]): Promise<void> {
		const interaction: AutocompleteInteraction = args[0];
		if (!interaction.isAutocomplete()) return;
		const autocomplete = bot.autocompleteInteractions.get(interaction.commandName);
		if (!autocomplete) return;
		try {
			await autocomplete.execute(bot, interaction);
		} catch (error) {
			console.log(`[AutocompleteHandler] error: ${error}`);
		}
	}
}