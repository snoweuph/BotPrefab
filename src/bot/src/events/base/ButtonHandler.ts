import Bot from '../../base/types/bot';
import BaseEvent from '../../base/classes/baseEvent';
import { ButtonInteraction } from 'discord.js';

const cooldownMap = new Map<string, Map<string, number>>();

export default class ButtonHandlerEvent extends BaseEvent {
	constructor() {
		super('interactionCreate');
	}

	/* eslint-disable-next-line */
	async execute(bot: Bot, ...args: Array<any>): Promise<void> {
		const interaction: ButtonInteraction = args[0];
		if (!interaction.isButton()) return;
		const button = bot.buttonInteractions.get(interaction.customId);
		if (!button) return;
		if (!interaction.memberPermissions.has(button.permissions)) return interaction.reply({ ephemeral: true, content: 'You don\'t have the permissions' });
		if (cooldownMap.has(interaction.guildId) && cooldownMap.get(interaction.guildId).has(interaction.user.id)) {
			const cooldownTimestamp = cooldownMap.get(interaction.guildId).get(interaction.user.id);
			if (interaction.createdTimestamp - cooldownTimestamp < button.cooldown) {
				return interaction.reply({ ephemeral: true, content: `You have to wait ${button.cooldown - (interaction.createdTimestamp - cooldownTimestamp)}ms before using this button again` });
			} else {
				cooldownMap.get(interaction.guildId).delete(interaction.user.id);
			}
		}
		try {
			await button.execute(bot, interaction);
			if (button.cooldown > 0) {
				if (!cooldownMap.has(interaction.guildId)) {
					cooldownMap.set(interaction.guildId, new Map<string, number>());
				}
				cooldownMap.get(interaction.guildId).set(interaction.user.id, interaction.createdTimestamp);
			}
		} catch (error) {
			console.log(`[ButtonHandler] error: ${error}`);
			interaction.reply({ ephemeral: true, content: 'An error occured while executing this button.' });
		}
	}
}