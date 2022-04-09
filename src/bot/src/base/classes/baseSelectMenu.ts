import { SelectMenuInteraction, CacheType, MessageSelectMenu } from 'discord.js';
import Bot from '@baseTypes/bot';

export default abstract class BaseSelectMenu {
	menu: MessageSelectMenu;
	id: string;
	/**
	 * @param menu - The selct menu itself, it's a new {@link MessageSelectMenu}.
	 */
	constructor(menu: MessageSelectMenu) {
		this.menu = menu;
		this.id = menu.customId;
	}
	/**
	 * This function will be called when the user selects an option.
	 * @remarks Please use Async if possible.
	 * @param bot - The Bot Object itself {@link Bot} that stores a lot of useful information.
	 * @param interaction - The interaction that is being executed.
	 * @param values - The values that were selected.
	 */
	abstract execute(bot: Bot, interaction: SelectMenuInteraction<CacheType>, values: Array<string>): Promise<void>;
}