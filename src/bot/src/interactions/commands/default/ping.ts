import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType } from 'discord.js';
import BaseCommand from '../../../base/classes/baseCommand';
import bot from '../../../base/types/bot';
import runPing from '../../../utils/ping';

export default class PingCommand extends BaseCommand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('ping')
				.setDescription('pong'),
		);
	}

	async execute(bot: bot, interaction: CommandInteraction<CacheType>): Promise<void> {
		await runPing(bot.client, interaction);
	}
}