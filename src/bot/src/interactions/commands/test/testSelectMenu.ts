import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType, MessageActionRow } from 'discord.js';
import BaseCommand from '../../../base/classes/baseCommand';
import bot from '../../../base/types/bot';
import TestSelectMenu from '../../selectMenus/testSelect';

export default class TestSelectMenuCommand extends BaseCommand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('testselectmenu')
				.setDescription('sends a simple select menu for testing'),
		);
	}

	async execute(bot: bot, interaction: CommandInteraction<CacheType>): Promise<void> {
		const row = new MessageActionRow().addComponents(new TestSelectMenu().menu);
		await interaction.reply({ components: [row] });
	}
}