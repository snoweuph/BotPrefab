import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType, CommandInteractionOption, TextChannel } from 'discord.js';
import BaseCommand from '@classes/baseCommand';
import bot from '@baseTypes/bot';

export default class ClearCommand extends BaseCommand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('clear')
				.setDescription('Clears the Chat')
				.addIntegerOption(option =>
					option
						.setName('amount')
						.setDescription('Amount of messages to delete')
						.setRequired(true)
						.setMinValue(1)
						.setMaxValue(500)
				),
			5 * 1000
		);
	}

	async execute(bot: bot, interaction: CommandInteraction<CacheType>, options: ReadonlyArray<CommandInteractionOption<CacheType>>): Promise<void> {
		const amount = options[0].value as number;
		const channel = interaction.channel as TextChannel;
		await interaction.deferReply({ ephemeral: true });
		const cyclAmount = Math.floor(amount / 100);
		const lastCycleAmount = amount % 100;
		let cleared = 0;
		if (cyclAmount > 0) {
			cleared = await this.doDeleteCycle(channel, cyclAmount);
		}
		if (lastCycleAmount > 0) {
			await channel.bulkDelete(lastCycleAmount, true).then(async function (msgs) {
				cleared += msgs.size;
			});
		}
		interaction.editReply({ content: `Cleared ${cleared} messages` });
	}
	doDeleteCycle(channel: TextChannel, cyclAmount: number) {
		return new Promise<number>((resolve) => {
			channel.bulkDelete(100, true)
				.then(async function (msgs) {
					let cleared = msgs.size;
					if (msgs.size == 0 || cyclAmount - 1 <= 0) {
						resolve(cleared);
					} else {
						cleared += await this.doDeleteCycle(channel, cyclAmount - 1);
						resolve(cleared);
					}
				})
		})
	}
}
