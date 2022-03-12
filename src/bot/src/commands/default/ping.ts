import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType, CommandInteractionOption } from 'discord.js';
import BaseCommand from '../../base/classes/baseCommand';
import bot from '../../base/types/bot';
import { run } from '../../utils/ping';

export default class PingCommand extends BaseCommand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('ping')
				.setDescription('pong'),
		);
	}

	async execute(bot: bot, interaction: CommandInteraction<CacheType>, options: readonly CommandInteractionOption<CacheType>[]): Promise<void> {
		await run(bot.client, interaction);
	}
}