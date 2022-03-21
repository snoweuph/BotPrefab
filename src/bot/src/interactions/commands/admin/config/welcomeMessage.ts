import { SlashCommandBuilder } from '@discordjs/builders';
import { ChannelType } from 'discord-api-types/v9';
import { CommandInteraction, CacheType, CommandInteractionOption } from 'discord.js';
import BaseCommand from '../../../../base/classes/baseCommand';
import bot from '../../../../base/types/bot';
import StateManager from '../../../../base/StateManager';
import Embds from '../../../../base/utils/embds';
import EmbdType from '../../../../base/types/embdTypes';

const welcomeMessageChannelIds = new Map<string, string>();
const welcomeMessageTitles = new Map<string, string>();
const welcomeMessageBodys = new Map<string, string>();
const welcomeMessageColors = new Map<string, string>();
const welcomeMessageImageEnableds = new Map<string, boolean>();
const welcomeMessageImageUrls = new Map<string, string>();
const welcomeMessageImageAccentColors = new Map<string, string>();

export default class WelcomeMessageCommand extends BaseCommand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('config-welcome')
				.setDescription('used to configure the welcome message')
				.addSubcommand((subcommand) =>
					subcommand
						.setName('channel')
						.setDescription('sets the channel for the welcome message')
						.addChannelOption((option) =>
							option
								.setName('channel')
								.setDescription('the channel where the welome message will be sent')
								.setRequired(true)
								// @ts-expect-error | @discordjs/builders is using a older version of discord-api-types, Instead of this, we could downgrade, but during reinstalling packages that can get out of sync
								.addChannelType(ChannelType.GuildText)
						)
				)
				.addSubcommand((subcommand) =>
					subcommand
						.setName('title')
						.setDescription('sets the title for the welcome message')
						.addStringOption((option) =>
							option
								.setName('title')
								.setDescription('you can use {user}, {server}, {tag} and {count} as placeholders')
								.setRequired(true)
						)
				)
				.addSubcommand((subcommand) =>
					subcommand
						.setName('body')
						.setDescription('sets the body for the welcome message')
						.addStringOption((option) =>
							option
								.setName('body')
								.setDescription('you can use {user}, {server}, {tag} and {count} as placeholders')
								.setRequired(true)
						)
				)
				.addSubcommand((subcommand) =>
					subcommand
						.setName('color')
						.setDescription('sets the embed color for the welcome message')
						.addStringOption((option) =>
							option
								.setName('color')
								.setDescription('should be in hex format #000000')
								.setRequired(true)
						)
				)
				.addSubcommand((subcommand) =>
					subcommand
						.setName('image-enabled')
						.setDescription('used to enable or disable the image for the welcome message')
						.addBooleanOption((option) =>
							option
								.setName('enabled')
								.setDescription('true for on, false for off')
								.setRequired(true)
						)
				)
				.addSubcommand((subcommand) =>
					subcommand
						.setName('image-url')
						.setDescription('sets the image for the welcome message')
						.addStringOption((option) =>
							option
								.setName('image-url')
								.setDescription('the image should have a size of 1024x380. to use the default image set this parameter to \'default\'')
								.setRequired(true)
						)
				)
				.addSubcommand((subcommand) =>
					subcommand
						.setName('image-accent-color')
						.setDescription('sets the accent color for the image for the welcome message')
						.addStringOption((option) =>
							option
								.setName('image-accent-color')
								.setDescription('should be in hex format #000000, use \'rainbow\' for a rainbow gradient')
								.setRequired(true)
						)
				)
		);
	}

	async execute(bot: bot, interaction: CommandInteraction<CacheType>, options: ReadonlyArray<CommandInteractionOption<CacheType>>): Promise<void> {
		let newValue: string | boolean;
		let isNewValue = true;
		let variableName: string;
		switch (options[0].name) {
		case 'channel':
			newValue = options[0].options[0].value as string;
			if (welcomeMessageChannelIds.get(interaction.guild.id) === newValue) {
				isNewValue = false;
			} else {
				variableName = 'welcomeMessageChannelId';
			}
			break;
		case 'title':
			newValue = options[0].options[0].value as string;
			if (newValue.length > 128) newValue = newValue.substring(0, 128);
			if (welcomeMessageTitles.get(interaction.guild.id) === newValue) {
				isNewValue = false;
			} else {
				variableName = 'welcomeMessageTitle';
			}
			break;
		case 'body':
			newValue = options[0].options[0].value as string;
			if (newValue.length > 2048) newValue = newValue.substring(0, 2048);
			if (welcomeMessageBodys.get(interaction.guild.id) === newValue) {
				isNewValue = false;
			} else {
				variableName = 'welcomeMessageBody';
			}
			break;
		case 'color':
			newValue = options[0].options[0].value as string;
			if (newValue.length !== 7 || newValue.charAt(0) !== '#') {
				const embd = await Embds.short(
					EmbdType.WARNING,
					'**The Value Could Not Be Changed**',
					'The value provided isnt in the right format, please use #000000'
				);
				interaction.reply({ ephemeral: true, embeds: [embd] });
				return;
			}
			if (welcomeMessageColors.get(interaction.guild.id) === newValue) {
				isNewValue = false;
			} else {
				variableName = 'welcomeMessageColor';
			}
			break;
		case 'image-enabled':
			newValue = options[0].options[0].value as boolean;
			if (welcomeMessageImageEnableds.get(interaction.guild.id) === newValue) {
				isNewValue = false;
			} else {
				variableName = 'welcomeMessageImageEnabled';
			}
			break;
		case 'image-url':
			newValue = options[0].options[0].value as string;
			if (!newValue.startsWith('http') && !newValue.endsWith('.png') && newValue !== 'default') {
				const embd = await Embds.short(
					EmbdType.WARNING,
					'**The Value Could Not Be Changed**',
					'The value provided isnt in the right format, please use a valid url'
				);
				interaction.reply({ ephemeral: true, embeds: [embd] });
				return;
			}
			if (newValue.length > 512) newValue = newValue.substring(0, 512);
			if (welcomeMessageImageUrls.get(interaction.guild.id) === newValue) {
				isNewValue = false;
			} else {
				variableName = 'welcomeMessageImageUrl';
			}
			break;
		case 'image-accent-color':
			newValue = options[0].options[0].value as string;
			if ((newValue.length !== 7 || newValue.charAt(0) !== '#') && newValue !== 'rainbow') {
				const embd = await Embds.short(
					EmbdType.WARNING,
					'**The Value Could Not Be Changed**',
					'The value provided isnt in the right format, please use #000000'
				);
				interaction.reply({ ephemeral: true, embeds: [embd] });
				return;
			}
			if (welcomeMessageImageAccentColors.get(interaction.guild.id) === newValue) {
				isNewValue = false;
			} else {
				variableName = 'welcomeMessageImageAccentColor';
			}
			break;
		}
		if (!isNewValue) {
			const embd = await Embds.short(
				EmbdType.WARNING,
				'**The Value Could Not Be Changed**',
				`The value is already set to ${newValue}`
			);
			interaction.reply({ ephemeral: true, embeds: [embd] });
			return;
		}
		const query = `UPDATE GuildSettings SET ${variableName} = ? WHERE guildId = ?`;
		try {
			StateManager.connection.query(query, [newValue, interaction.guild.id]);
			const embd = await Embds.short(
				EmbdType.SUCCESS,
				'**The Value Was Changed**',
				`The value was changed to ${newValue}`
			);
			interaction.reply({ ephemeral: true, embeds: [embd] });
			StateManager.emit(variableName + 'Fetched', interaction.guild.id, newValue);
		} catch (error) {
			console.log(error);
			const embd = await Embds.short(
				EmbdType.ERROR,
				'**The Value Could Not Be Changed**',
				`An unexpected error occured while trying to change the value to ${newValue}`
			);
			interaction.reply({ ephemeral: true, embeds: [embd] });
		}
	}
}

StateManager.on('welcomeMessageChannelId' + 'Fetched', (guildId: string, welcomeMessageChannelId: string) => {
	welcomeMessageChannelIds.set(guildId, welcomeMessageChannelId);
});
StateManager.on('welcomeMessageTitle' + 'Fetched', (guildId: string, welcomeMessageTitle: string) => {
	welcomeMessageTitles.set(guildId, welcomeMessageTitle);
});
StateManager.on('welcomeMessageBody' + 'Fetched', (guildId: string, welcomeMessageBody: string) => {
	welcomeMessageBodys.set(guildId, welcomeMessageBody);
});
StateManager.on('welcomeMessageColor' + 'Fetched', (guildId: string, welcomeMessageColor: string) => {
	welcomeMessageColors.set(guildId, welcomeMessageColor);
});
StateManager.on('welcomeMessageImageEnabled' + 'Fetched', (guildId: string, welcomeMessageImageEnabled: boolean) => {
	welcomeMessageImageEnableds.set(guildId, welcomeMessageImageEnabled);
});
StateManager.on('welcomeMessageImageUrl' + 'Fetched', (guildId: string, welcomeMessageImageUrl: string) => {
	welcomeMessageImageUrls.set(guildId, welcomeMessageImageUrl);
});
StateManager.on('welcomeMessageImageAccentColor' + 'Fetched', (guildId: string, welcomeMessageImageAccentColor: string) => {
	welcomeMessageImageAccentColors.set(guildId, welcomeMessageImageAccentColor);
});