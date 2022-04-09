import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType, CommandInteractionOption, EmbedFieldData } from 'discord.js';
import BaseCommand from '@classes/baseCommand';
import bot from '@baseTypes/bot';
import Embds from '@base/utils/embds';
import EmbdTypes from '@base/types/embdTypes';

export default class AvatarCommand extends BaseCommand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('avatar')
				.setDescription('Shows the avatar of the mentioned user or the author if no user is mentioned')
				.addUserOption(option =>
					option
						.setName('user')
						.setDescription('The user to get the avatar of')
						.setRequired(false)
				),
			3 * 1000
		);
	}

	async execute(bot: bot, interaction: CommandInteraction<CacheType>, options: ReadonlyArray<CommandInteractionOption<CacheType>>): Promise<void> {
		const user = options[0] ? options[0].user : interaction.member.user;
		const params = '?size=1024';
		const baseURL = 'https://cdn.discordapp.com/avatars/';
		const fields: Array<EmbedFieldData> = [
			{
				name: '**Link as**',
				value: `[png](${baseURL}${user.id}/${user.avatar}.png${params}) | [jpg](${baseURL}${user.id}/${user.avatar}.jpg${params}) | [webp](${baseURL}${user.id}/${user.avatar}.webp${params})`,
			}
		]
		const embed = await Embds.medium(
			EmbdTypes.NORMAL,
			`Avatar of ${user.username}${user.discriminator}`,
			fields,
			`${baseURL}${user.id}/${user.avatar}.png${params}`
		)
		interaction.reply({ embeds: [embed] });
	}
}
