import Bot from '@base/types/bot';
import BaseEvent from '@base/classes/baseEvent';
import { SelectMenuInteraction } from 'discord.js';

export default class SelectMenuEvent extends BaseEvent {
	constructor() {
		super('interactionCreate');
	}

	/* eslint-disable-next-line */
	async execute(bot: Bot, ...args: any[]): Promise<void> {
		const interaction: SelectMenuInteraction = args[0];
		if (!interaction.isSelectMenu()) return;
		const menu = bot.selectMenus.get(interaction.customId);
		if (!menu) return;
		try {
			menu.execute(bot, interaction, interaction.values);
		} catch (error) {
			console.log(`[SelectMenuEvent] error: ${error}`);
			interaction.reply({ ephemeral: true, content: 'An error occured while updating this menu.' });
		}
	}
}