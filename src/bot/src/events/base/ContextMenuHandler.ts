import Bot from '../../base/types/bot';
import BaseEvent from '../../base/classes/baseEvent';
import { ContextMenuInteraction } from 'discord.js';

const userCooldownMap = new Map<string, Map<string, number>>();
const messageCooldownMap = new Map<string, Map<string, number>>();

export default class ContextMenuHandlerEvent extends BaseEvent {
	constructor() {
		super('interactionCreate');
	}

	/* eslint-disable-next-line */
    async execute(bot: Bot, ...args: any[]): Promise<void> {
		const interaction: ContextMenuInteraction = args[0];
		if (!interaction.isContextMenu()) return;

		if (interaction.isUserContextMenu() && bot.userContextMenus.has(interaction.commandName)) {
			const contextMenu = bot.userContextMenus.get(interaction.commandName);
			if (!contextMenu) return;
			if (!interaction.memberPermissions.has(contextMenu.permissions)) return interaction.reply({ ephemeral: true, content: 'You don\'t have the permissions' });
			if (userCooldownMap.has(interaction.user.id) && userCooldownMap.get(interaction.user.id).has(interaction.commandName)) {
				const cooldownTimestamp = userCooldownMap.get(interaction.user.id).get(interaction.commandName);
				if (interaction.createdTimestamp - cooldownTimestamp < contextMenu.cooldown) {
					return interaction.reply({ ephemeral: true, content: `You have to wait ${contextMenu.cooldown - (interaction.createdTimestamp - cooldownTimestamp)}ms before using this action again` });
				} else {
					userCooldownMap.get(interaction.user.id).delete(interaction.commandName);
				}
			}
			try {
				await contextMenu.execute(bot, interaction);
				if (contextMenu.cooldown > 0) {
					if (!userCooldownMap.has(interaction.user.id)) {
						userCooldownMap.set(interaction.user.id, new Map<string, number>());
					}
					userCooldownMap.get(interaction.user.id).set(interaction.commandName, interaction.createdTimestamp);
				}
			} catch (error) {
				console.log(`[ContextMenuHandler] error: ${error}`);
				interaction.reply({ ephemeral: true, content: 'An error occured while executing this action menu.' });
			}

		} else if (interaction.isMessageContextMenu() && bot.messageContextMenus.has(interaction.commandName)) {
			const contextMenu = bot.messageContextMenus.get(interaction.commandName);
			if (!contextMenu) return;
			if (!interaction.memberPermissions.has(contextMenu.permissions)) return interaction.reply({ ephemeral: true, content: 'You don\'t have the permissions' });
			if (messageCooldownMap.has(interaction.user.id) && messageCooldownMap.get(interaction.user.id).has(interaction.commandName)) {
				const cooldownTimestamp = messageCooldownMap.get(interaction.user.id).get(interaction.commandName);
				if (interaction.createdTimestamp - cooldownTimestamp < contextMenu.cooldown) {
					return interaction.reply({ ephemeral: true, content: `You have to wait ${contextMenu.cooldown - (interaction.createdTimestamp - cooldownTimestamp)}ms before using this action again` });
				} else {
					messageCooldownMap.get(interaction.user.id).delete(interaction.commandName);
				}
			}
			try {
				await contextMenu.execute(bot, interaction);
				if (contextMenu.cooldown > 0) {
					if (!messageCooldownMap.has(interaction.user.id)) {
						messageCooldownMap.set(interaction.user.id, new Map<string, number>());
					}
					messageCooldownMap.get(interaction.user.id).set(interaction.commandName, interaction.createdTimestamp);
				}
			} catch (error) {
				console.log(`[ContextMenuHandler] error: ${error}`);
				interaction.reply({ ephemeral: true, content: 'An error occured while executing this action menu.' });
			}
		} else {
			return;
		}
	}
}