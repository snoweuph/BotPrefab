import { AutocompleteInteraction, CacheType } from 'discord.js';
import Bot from '@baseTypes/bot';

export default abstract class BaseAutocompleteInteraction {
	commandName: string;
	/**
	 * @constructor BaseAutocompleteInteraction.
	 * @param {string} commandName The Name of the Command for that Autocomplete should be done.
	 */
	constructor(commandName: string) {
		this.commandName = commandName;
	}
	/**
	 * Please use Async if possible.
	 * @param {Bot} bot The Bot Object itself {@link Bot} that stores a lot of useful information.
	 * @param {AutocompleteInteraction<CacheType>} interaction The interaction that is being executed.
	 */
	abstract execute(bot: Bot, interaction: AutocompleteInteraction<CacheType>): Promise<void>;
}

