import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType, MessageActionRow } from 'discord.js';
import BaseCommand from '@base/classes/baseCommand';
import bot from '@base/types/bot';
import helloWorldButton from '@interactions/buttons/helloWorld';

export default class HelloButtonCommand extends BaseCommand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('hellobutton')
				.setDescription('sends a simple button for testing'),
			5 * 1000
		);
	}

	async execute(bot: bot, interaction: CommandInteraction<CacheType>): Promise<void> {
		const row = new MessageActionRow().addComponents(new helloWorldButton().button);
		await interaction.reply({ components: [row] });
	}
}