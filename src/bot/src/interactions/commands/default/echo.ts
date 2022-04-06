import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType, CommandInteractionOption } from 'discord.js';
import BaseCommand from '@classes/baseCommand';
import bot from '@baseTypes/bot';

export default class EchoCommand extends BaseCommand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('echo')
				.setDescription('some echo description')
				.addStringOption(option =>
					option
						.setName('text')
						.setDescription('the text to echo')
						.setRequired(true)
				),
		);
	}

	async execute(bot: bot, interaction: CommandInteraction<CacheType>, options: ReadonlyArray<CommandInteractionOption<CacheType>>): Promise<void> {
		interaction.reply(options[0].value as string);
	}
}
