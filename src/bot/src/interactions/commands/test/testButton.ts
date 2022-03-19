import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType, CommandInteractionOption, MessageActionRow } from 'discord.js';
import BaseCommand from '../../../base/classes/baseCommand';
import bot from '../../../base/types/bot';
import helloWorldButton from '../../../prefabs/buttons/helloWorld';

export default class TestButtonCommand extends BaseCommand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('testbutton')
				.setDescription('sends a simple button for testing'),
		);
	}

	async execute(bot: bot, interaction: CommandInteraction<CacheType>, options: ReadonlyArray<CommandInteractionOption<CacheType>>): Promise<void> {
		const row = new MessageActionRow().addComponents(helloWorldButton);
		await interaction.reply({ components: [row] });
	}
}