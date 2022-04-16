import { AutocompleteInteraction, CacheType } from 'discord.js';
import Bot from '@baseTypes/bot';

export default abstract class BaseAutocompleteInteraction {
	commandName: string;
	/**
	 * @param commandName - The Name of the Command for that Autocomplete should be done.
	 */
	constructor(commandName: string) {
		this.commandName = commandName;
	}
	/**
	 * This Function is called when the Autocomplete for the specified Command is triggered.
	 * @remarks Please use Async if possible.
	 * @param bot - The Bot Object itself {@link Bot} that stores a lot of useful data.
	 * @param interaction - The Interaction that is being executed.
	 */
	abstract execute(bot: Bot, interaction: AutocompleteInteraction<CacheType>): Promise<void>;
}

