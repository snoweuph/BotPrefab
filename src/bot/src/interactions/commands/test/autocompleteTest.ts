import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType, CommandInteractionOption } from 'discord.js';
import BaseCommand from '@base/classes/baseCommand';
import bot from '@base/types/bot';

export default class AutocompleteCommand extends BaseCommand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('autocomplete-test')
				.setDescription('a simple command to test the auto completion feature')
				.addStringOption((option) =>
					option
						.setName('some-string')
						.setDescription('a string option with custom autocompletion')
						.setRequired(true)
						.setAutocomplete(true)
				),
		);
	}

	async execute(bot: bot, interaction: CommandInteraction<CacheType>, options: ReadonlyArray<CommandInteractionOption<CacheType>>): Promise<void> {
		interaction.reply({
			content: `The send value of the option you chose was: ${options[0].value}`,
		});
	}
}