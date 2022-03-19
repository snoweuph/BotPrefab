import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType, CommandInteractionOption, EmbedFieldData } from 'discord.js';
import BaseCommand from '../../../base/classes/baseCommand';
import bot from '../../../base/types/bot';
import EmbdType from '../../../base/types/embdTypes';
import Embds from '../../../base/utils/embds';

export default class HelpCommand extends BaseCommand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('help')
				.setDescription('gives a list of all command functions.'),
		);
	}

	async execute(bot: bot, interaction: CommandInteraction<CacheType>, options: ReadonlyArray<CommandInteractionOption<CacheType>>): Promise<void> {
		const category = bot.commandCategories.find(c => c.uniqueId === options[0].value.toString());
		if (!category) {
			interaction.reply({
				content: 'This Category does not exist',
				ephemeral: true,
			});
			return;
		}
		if (bot.CategoryCommandsMap.get(category).length <= 0) {
			interaction.reply({
				content: 'There are no Commands for this Category.',
				ephemeral: true,
			});
		}
		const fields: Array<EmbedFieldData> = [];
		for (const command of bot.CategoryCommandsMap.get(category)) {
			fields.push({
				name: `__**${command.data.name}**__`,
				value: `${command.data.description}`,
			});
		}
		const embed = await Embds.medium(
			EmbdType.NORMAL,
			`Help *-> ${category.displayName}*`,
			fields,
			bot.client.user.avatarURL()
		);
		interaction.reply({ embeds: [embed] });
	}
}