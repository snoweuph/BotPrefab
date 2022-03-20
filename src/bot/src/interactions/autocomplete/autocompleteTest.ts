import { AutocompleteInteraction, CacheType } from 'discord.js';
import BaseAutocompleteInteraction from '../../base/classes/baseAutocompleteInteraction';
import bot from '../../base/types/bot';

export default class AutocompleteTestAutocompleteInteraction extends BaseAutocompleteInteraction {
	constructor() {
		super('autocomplete-test');
	}

	async execute(bot: bot, interaction: AutocompleteInteraction<CacheType>): Promise<void> {
		interaction.respond([
			{
				name: 'Random Option',
				value: 'random-option',
			},
			{
				name: 'Number of Members on the Server',
				value: `${interaction.guild.memberCount}`,
			}
		])
	}
}