import { AutocompleteInteraction, CacheType } from 'discord.js';
import Bot from '../types/bot';

export default abstract class BaseAutocompleteInteraction {
	commandName: string;

	constructor(commandName: string) {
		this.commandName = commandName;
	}

	abstract execute(bot: Bot, interaction: AutocompleteInteraction<CacheType>): Promise<void>;
}

