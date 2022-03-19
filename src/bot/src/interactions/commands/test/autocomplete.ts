import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType, CommandInteractionOption } from 'discord.js';
import BaseCommand from '../../../base/classes/baseCommand';
import bot from '../../../base/types/bot';

export default class AutocompleteCommand extends BaseCommand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('autocomplete')
				.setDescription('a simple command to test the auto completion feature'),
		);
	}

	async execute(bot: bot, interaction: CommandInteraction<CacheType>, options: ReadonlyArray<CommandInteractionOption<CacheType>>): Promise<void> {
		//TODO: Write your code here
	}
}