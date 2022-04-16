import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType } from 'discord.js';
import BaseCommand from '@classes/baseCommand';
import bot from '@baseTypes/bot';

export default class GuildsCommand extends BaseCommand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('guilds')
				.setDescription('Gets the amount of guilds the bot is in'),
			5 * 1000
		);
	}

	async execute(bot: bot, interaction: CommandInteraction<CacheType>): Promise<void> {
		if (bot.client.shard) {
			bot.client.shard.fetchClientValues('guilds.cache.size').then(results => {
				interaction.reply(`I am in ${results.reduce((acc: number, guildCount: number) => acc + guildCount, 0)} guilds`);
			})
		} else {
			interaction.reply(`I am in ${bot.client.guilds.cache.size} guilds`);
		}
	}
}
