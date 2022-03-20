import { SelectMenuInteraction, CacheType, MessageSelectMenu } from 'discord.js';
import Bot from '../types/bot';

export default abstract class BaseSelectMenu {
	menu: MessageSelectMenu;
	id: string;

	constructor(menu: MessageSelectMenu) {
		this.menu = menu;
		this.id = menu.customId;
	}

	abstract execute(bot: Bot, interaction: SelectMenuInteraction<CacheType>, values: Array<string>): Promise<void>;
}