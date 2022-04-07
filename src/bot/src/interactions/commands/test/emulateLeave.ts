import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType, CommandInteractionOption, GuildMember } from 'discord.js';
import BaseCommand from '@base/classes/baseCommand';
import bot from '@base/types/bot';
import EmbdType from '@base/types/embdTypes';
import Embds from '@base/utils/embds';

export default class EmulateLeaveCommand extends BaseCommand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('emulate-leave')
				.setDescription('emulates a leave event for a choosen user')
				.addUserOption((option) =>
					option
						.setName('member')
						.setDescription('the user to emulate a leave event for')
				),
			3 * 1000
		);
	}

	async execute(bot: bot, interaction: CommandInteraction<CacheType>, options: ReadonlyArray<CommandInteractionOption<CacheType>>): Promise<void> {
		let userMention: string;
		if (!options[0]) {
			bot.client.emit('guildMemberRemove', interaction.member as GuildMember);
			userMention = `<@!${interaction.member.user.id}>`;
		} else {
			bot.client.emit('guildMemberRemove', options[0].member as GuildMember);
			userMention = `<@!${options[0].user.id}>`;
		}
		const embd = await Embds.short(
			EmbdType.SUCCESS,
			'**Emulated leave event**',
			`Successfully emulated a leave event for ${userMention}`
		)
		interaction.reply({ ephemeral: true, embeds: [embd] });
	}
}