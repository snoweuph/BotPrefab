import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType, CommandInteractionOption, GuildMember } from 'discord.js';
import BaseCommand from '../../../base/classes/baseCommand';
import bot from '../../../base/types/bot';
import EmbdType from '../../../base/types/embdTypes';
import Embds from '../../../base/utils/embds';

export default class EmulateJoinCommand extends BaseCommand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('emulate-join')
				.setDescription('emulates a join event for a choosen user')
				.addUserOption((option) =>
					option
						.setName('member')
						.setDescription('the user to emulate a join event for')
				),
			2000
		);
	}

	async execute(bot: bot, interaction: CommandInteraction<CacheType>, options: ReadonlyArray<CommandInteractionOption<CacheType>>): Promise<void> {
		let userMention: string;
		if (!options[0]) {
			bot.client.emit('guildMemberAdd', interaction.member as GuildMember);
			userMention = `<@!${interaction.member.user.id}>`;
		} else {
			bot.client.emit('guildMemberAdd', options[0].member as GuildMember);
			userMention = `<@!${options[0].user.id}>`;
		}
		const embd = await Embds.short(
			EmbdType.SUCCESS,
			'**Emulated join event**',
			`Successfully emulated a join event for ${userMention}`
		)
		interaction.reply({ ephemeral: true, embeds: [embd] });
	}
}